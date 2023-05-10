import svelteComponent from '../../+internal/other/svelte/component';
import './style.css';
import { isNumber } from 'lodash';
import type { EditorView } from "@codemirror/view";
//@ts-ignore
import SvelteCodeEditor from './src/CodeEditor.svelte';

class CodeEditor extends svelteComponent(SvelteCodeEditor) {
    constructor() {
        super();
        this._element.$on("change", (ev) => {
            this.publish("value_changed", ev.detail);
        })
        this.subscribe("insert_text_offset", (data: { text: string, pos: number | 'start' | 'end' | 'current' }) => {
            let v: EditorView = this._element._view;
            const idx = mapCursorOffset(data.pos, v);
            v.dispatch({
                changes: { from: idx, insert: data.text }
            })
        })

        this.subscribe("insert_text_position", (data: { text: string, pos: number[]}) => {
            let v: EditorView = this._element._view;
            const docLength = v.state.doc.length;
            const lines = v.state.doc.lines;
            if (data.pos[0] > lines) {
                data.pos[0] = lines;
            }
            const lineLength = v.state.doc.line(data.pos[0]).length;
            if (data.pos[1] > lineLength) {
                data.pos[1] = lineLength;
            }
            let n = v.state.doc.line(data.pos[0]).from + data.pos[1];
            v.dispatch({
                changes: { from: n, insert: data.text }
            })
        })

        this.subscribe("move_cursor_offset", (data:  number | 'start' | 'end' | 'current') => {
            let v: EditorView = this._element._view;
            const n: number = mapCursorOffset(data, v);
            v.dispatch({ selection: { head: n, anchor: n } });
        })

        this.subscribe("move_cursor_position", (data:  number[]) => {
            let v: EditorView = this._element._view;
            const docLength = v.state.doc.length;
            const lines = v.state.doc.lines;
            if (data[0] > lines) {
                data[0] = lines;
            }
            const lineLength = v.state.doc.line(data[0]).length;
            if (data[1] > lineLength) {
                data[1] = lineLength;
            }
            let n = v.state.doc.line(data[0]).from + data[1];
            v.dispatch({ selection: { head: n, anchor: n } });
        })

    }

    get cursor_offset(){
        const v: EditorView = this._element._view;
        return v.state.selection.main.head;
    }

    get cursor_position() {
        const v: EditorView = this._element._view;
        const offset = v.state.selection.main.head;
        const line = v.state.doc.lineAt(offset);
        return [line.number, offset - line.from];
    }
};
export default CodeEditor;

customElements.define("weblab-editor", CodeEditor);


function mapCursorOffset(data: number | 'start' | 'end' | 'current', v: EditorView): number {
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