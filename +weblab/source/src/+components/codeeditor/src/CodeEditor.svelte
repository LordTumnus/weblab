<script lang="ts">
    import CodeMirror from "svelte-codemirror-editor";
    import {StreamLanguage} from "@codemirror/language"
    import matlab from "./lang/matlab";

    const matlab_lan = StreamLanguage.define(matlab);
    
  </script>
  
  <CodeMirror extensions={[matlab_lan]}></CodeMirror>