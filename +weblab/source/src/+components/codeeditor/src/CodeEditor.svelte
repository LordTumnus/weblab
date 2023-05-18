<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { type Extension } from "@codemirror/state";
  import { StreamLanguage } from "@codemirror/language";
  import { ViewPlugin, EditorView } from "@codemirror/view";
  import getExtensions from "./extensions/basic";
  import darkTheme from "./theme/dark";
  import lightTheme from "./theme/light";
  import matlab from "./lang/matlab";

  // Properties that can be controlled in Matlab
  export let theme: string = "light";
  export let value: string = "";
  export let editable: boolean = true;
  export let line_numbers: boolean = true;
  export let highlight_active_line: boolean = true;
  export let match_brackets: boolean = true;
  export let wrap_lines: boolean = false;
  export let highlight_matching_words: boolean = true;

  // Internal properties
  export let _view: EditorView;

  // Plugins
  let lang = StreamLanguage.define(matlab);
  let viewP = ViewPlugin.define((view: EditorView) => {
    _view = view;
    return {};
  });

  let extensions: Extension[];
  $: extensions = [
    lang,
    viewP,
    ...getExtensions(
      line_numbers,
      highlight_active_line,
      match_brackets,
      highlight_matching_words
    ),
  ];
</script>

<CodeMirror
  basic={false}
  {extensions}
  tabSize={4}
  theme={theme === "dark" ? darkTheme : lightTheme}
  bind:value
  {editable}
  lineWrapping={wrap_lines}
  on:change
/>
