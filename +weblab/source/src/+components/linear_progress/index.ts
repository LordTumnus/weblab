import svelteComponent from "../../+internal/other/svelte/component";
import "./style.css";

// @ts-ignore
import LinearProgress from './src/LinearProgress.svelte';

const LinProgress = svelteComponent(LinearProgress);

export default LinProgress;
// @ts-ignore
customElements.define("weblab-progress", LinProgress);