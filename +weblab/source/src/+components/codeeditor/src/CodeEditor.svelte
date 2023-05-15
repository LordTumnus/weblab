<script lang="ts">
  import CodeMirror from "svelte-codemirror-editor";
  import { type Extension, EditorState } from "@codemirror/state";

  import {
    StreamLanguage,
    foldGutter,
    indentOnInput,
    syntaxHighlighting,
    defaultHighlightStyle,
    bracketMatching,
    foldKeymap,
  } from "@codemirror/language";

  import {
    ViewPlugin,
    EditorView,
    lineNumbers,
    highlightActiveLineGutter,
    highlightSpecialChars,
    drawSelection,
    dropCursor,
    rectangularSelection,
    crosshairCursor,
    highlightActiveLine,
    keymap,
  } from "@codemirror/view";

  import {
    closeBrackets,
    autocompletion,
    closeBracketsKeymap,
    completionKeymap,
  } from "@codemirror/autocomplete";

  import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
  import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
  import { lintKeymap } from "@codemirror/lint";

  import darkTheme from "./theme/dark";
  import lightTheme from "./theme/light";
  import matlab from "./lang/matlab";

  export let theme: string = "light";
  export let value: string = "";
  export let editable: boolean = true;
  export let line_numbers: boolean = true;
  export let highlight_active_line: boolean = true;
  export let match_brackets: boolean = true;
  export let wrap_lines: boolean = false;
  export let highlight_matching_words: boolean = true;

  export let _view: EditorView;

  const matlab_lan = StreamLanguage.define(matlab);

  let extensions: any[];
  $: extensions = [
    matlab_lan,
    ViewPlugin.define((v) => {
      _view = v;
      return {};
    }),
    ...get_custom_extensions(line_numbers, highlight_active_line, match_brackets, highlight_matching_words),
  ];

  function get_custom_extensions(
    useLineNumbers: boolean,
    doHighlightLine: boolean, 
    doMatchBrackets: boolean,
    doHighlightMatching: boolean,
  ) {
    let custom_extensions: Extension[] = [
      highlightSpecialChars(),
      history(),
      foldGutter(),
      dropCursor(),
      EditorState.allowMultipleSelections.of(false),
      indentOnInput(),
      syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
      autocompletion(),
      keymap.of([
        ...closeBracketsKeymap,
        ...defaultKeymap,
        //...searchKeymap,
        ...historyKeymap,
        ...foldKeymap,
        //...completionKeymap,
        //...lintKeymap,
      ]),
    ];
    if (useLineNumbers) {
      custom_extensions.push(lineNumbers());
    }
    if (doHighlightLine) {
      custom_extensions.push(highlightActiveLine());
      custom_extensions.push(highlightActiveLineGutter());
    }
    if (doMatchBrackets) {
      custom_extensions.push(bracketMatching());
      custom_extensions.push(closeBrackets());
    }
    if (doHighlightMatching) {
      custom_extensions.push(highlightSelectionMatches());
    }

    return custom_extensions;
  }
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
