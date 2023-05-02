import svelteComponent from '../../+internal/other/svelte/component';
//@ts-ignore
import SvelteCodeEditor from './src/CodeEditor.svelte';


let CodeEditor = svelteComponent(SvelteCodeEditor);
export default CodeEditor;

customElements.define("weblab-editor", CodeEditor);