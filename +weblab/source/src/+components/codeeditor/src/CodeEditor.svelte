<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { StreamLanguage } from "@codemirror/language";
  import { ViewPlugin } from "@codemirror/view";
  import type { EditorView } from "@codemirror/view";

  import darkTheme from "./theme/dark";
  import lightTheme from "./theme/light";
  import matlab from "./lang/matlab";

  export let theme: string = "light";
  export let value: string = "";
  export let editable: boolean = true;
  export let wrap_lines: boolean = false;

  export let _view: EditorView;

  const matlab_lan = StreamLanguage.define(matlab);
  const extensions = [
    matlab_lan, 
    ViewPlugin.define((v) => {
      _view = v;
      return {};
    }),
  ];
</script>

<CodeMirror
  {extensions}
  tabSize={4}
  theme={theme === "dark" ? darkTheme : lightTheme}
  bind:value
  {editable}
  lineWrapping={wrap_lines}
  on:change
/>
