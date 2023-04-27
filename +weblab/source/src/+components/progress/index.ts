import svelteComponent from "../../+internal/other/svelte/component";
import "./style.css";

// @ts-ignore
import LinearProgress from './svelte/LinearProgress.svelte';

const LinProgress = svelteComponent(LinearProgress);

export default LinProgress;
// @ts-ignore
customElements.define("weblab-pgbar", LinProgress);