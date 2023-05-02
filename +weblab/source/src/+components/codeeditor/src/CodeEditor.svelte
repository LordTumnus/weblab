<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { StreamLanguage } from "@codemirror/language";
  import type { Extension } from "@codemirror/state";
  import darkTheme from './theme/dark'
  import lightTheme from './theme/light'
  import matlab from "./lang/matlab";

  export let theme: string;
  export let value: string;

  let mode: Extension;
  $: mode = getTheme(theme);

  const matlab_lan = StreamLanguage.define(matlab);

  function getTheme(mode: string) {
    switch (mode) {
      case "light":
        return lightTheme;
      case "dark":
        return darkTheme;
      default:
        return lightTheme;
    }
  }
</script>

<CodeMirror extensions={[matlab_lan]} tabSize={4} theme={mode} bind:value on:change />
