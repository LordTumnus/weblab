import svelteComponent from "../../+internal/other/svelte/component";
import "./style.css";


// @ts-ignore
import Progress from './src/Progress.svelte';


const ProgressBar = svelteComponent(Progress);

export default ProgressBar;
// @ts-ignore
customElements.define("weblab-progress", ProgressBar);