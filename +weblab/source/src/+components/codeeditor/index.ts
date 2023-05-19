import svelteComponent from '../../+internal/other/svelte/component';
import './style.css';
import { isNumber } from 'lodash';
import type { EditorView } from "@codemirror/view";
import { undo, redo } from "@codemirror/commands";
import { EditorState, Compartment, StateEffect } from "@codemirror/state";
import readOnlyRangesExtension from "codemirror-readonly-ranges";
import { markUneditableRange } from './src/extensions/readonly';

//@ts-ignore
import SvelteCodeEditor from './src/CodeEditor.svelte';

type CursorOffset = number | 'start' | 'end' | 'current';

class CodeEditor extends svelteComponent(SvelteCodeEditor) {
    _uneditable: Compartment;
    constructor() {
        super();
        this._element.$on("change", (ev) => {
            this.publish("value_changed", ev.detail);
        })
        this.subscribe("insert_text", (data: string) => {
            let v: EditorView = this._element._view;
            const idx = v.state.selection.main.head;
            v.dispatch({
                changes: { from: idx, insert: data },
                selection: { anchor: idx + data.length },
                scrollIntoView: true,
            })
        })

        this.subscribe("replace_text", (data: string) => {
            let v: EditorView = this._element._view;
            v.dispatch(v.state.replaceSelection(data));
        })

        this.subscribe("undo", () => {
            undo(this._element._view);
        })

        this.subscribe("redo", () => {
            redo(this._element._view);
        })

        this.subscribe("move_cursor_offset", (data: CursorOffset) => {
            let v: EditorView = this._element._view;
            const n: number = mapCursorOffset(data, v);
            v.dispatch({ selection: { head: n, anchor: n } });
        })

        this.subscribe("move_cursor_position", (data: number[]) => {
            let v: EditorView = this._element._view;
            let n = position2offset(data, v);
            v.dispatch({ selection: { head: n, anchor: n } });
        })

        this.subscribe("select_offset", (data: { from: CursorOffset, to: CursorOffset }) => {
            let v: EditorView = this._element._view;
            const f = mapCursorOffset(data.from, v);
            const t = mapCursorOffset(data.to, v);
            v.dispatch({ selection: { anchor: f, head: t } });
        })

        this.subscribe("select_position", (data: { from: number[], to: number[] }) => {
            let v: EditorView = this._element._view;
            const f = position2offset(data.from, v);
            const t = position2offset(data.to, v);
            v.dispatch({ selection: { anchor: f, head: t } });
        })

        this.subscribe("focus", (data: boolean) => {
            let v: EditorView = this._element._view;
            data ? v.focus() : v.contentDOM.blur();
        })

    }

    get cursor_offset() {
        const v: EditorView = this._element._view;
        return v.state.selection.main.head;
    }

    get cursor_position() {
        const v: EditorView = this._element._view;
        const offset = v.state.selection.main.head;
        const line = v.state.doc.lineAt(offset);
        return [line.number, offset - line.from];
    }

    set uneditable_lines(lines: number[]) {
        const v: EditorView = this._element._view;
        markUneditableRange(v, lines);
    }
};
export default CodeEditor;

customElements.define("weblab-editor", CodeEditor);

const updateUneditableLinesExtension = (lines: number | number[]) => {
    let getReadOnlyRanges = (
        targetState: EditorState
    ): Array<{ from: number | undefined; to: number | undefined }> => {

        let code_lines: Array<{
            from: number | undefined;
            to: number | undefined;
        }> = [];
        if (!Array.isArray(lines)) {
            lines = [lines];
        }
        for (const line of lines) {
            code_lines.push({
                from: targetState.doc.line(line).from,
                to: targetState.doc.line(line).to,
            });
        };
        return code_lines;
    };

    return readOnlyRangesExtension(getReadOnlyRanges);
};

function mapCursorOffset(data: CursorOffset, v: EditorView): number {
    const docLength = v.state.doc.length
    if (isNumber(data)) {
        return data > docLength ? docLength : data;
    }
    switch (data) {
        case "start":
            return 0;
        case "end":
            return v.state.doc.length;
        case "current":
            return v.state.selection.main.head;
    }
}

function position2offset(pos: number[], v: EditorView) {
    const docLength = v.state.doc.length;
    const lines = v.state.doc.lines;
    if (pos[0] > lines) {
        pos[0] = lines;
    }
    const lineLength = v.state.doc.line(pos[0]).length;
    if (pos[1] > lineLength) {
        pos[1] = lineLength;
    }
    return v.state.doc.line(pos[0]).from + pos[1];
}