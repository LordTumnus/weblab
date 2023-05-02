import svelteComponent from '../../+internal/other/svelte/component';
import './style.css';
//@ts-ignore
import SvelteCodeEditor from './src/CodeEditor.svelte';


class CodeEditor extends svelteComponent(SvelteCodeEditor) {
    constructor() {
        super();
        this._element.$on("change", (ev) => {
            this.publish("value_changed", ev.detail);
        })
    }
};
export default CodeEditor;

customElements.define("weblab-editor", CodeEditor);