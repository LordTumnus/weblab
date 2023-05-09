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
        this.subscribe("insert_text", (data: { text: string, pos: number | 'start' | 'end' | 'current' }) => {
            let v: EditorView = this._element._view;
            const idx = mapCursorPosition(data.pos, v);
            v.dispatch({
                changes: { from: idx, insert: data.text }
            })
        })
        this.subscribe("move_cursor", (data:  number | 'start' | 'end' | 'current') => {
            let v: EditorView = this._element._view;
            const n: number = mapCursorPosition(data, v);
            v.dispatch({ selection: { head: n, anchor: n } });
        })
    }

    get cursor_position(){
        const v: EditorView = this._element._view;
        return v.state.selection.main.head;
    }
};
export default CodeEditor;

customElements.define("weblab-editor", CodeEditor);


function mapCursorPosition(data: number | 'start' | 'end' | 'current', v: EditorView): number {
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