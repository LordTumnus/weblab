<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { StreamLanguage } from "@codemirror/language";
  import darkTheme from "./theme/dark";
  import lightTheme from "./theme/light";
  import matlab from "./lang/matlab";

  export let theme: string = "light";
  export let value: string = "";

  const matlab_lan = StreamLanguage.define(matlab);
</script>

<CodeMirror
  extensions={[matlab_lan]}
  tabSize={4}
  theme={theme === "dark" ? darkTheme : lightTheme}
  {value}
  on:change
/>
