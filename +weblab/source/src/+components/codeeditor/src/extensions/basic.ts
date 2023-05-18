import { type Extension, EditorState } from "@codemirror/state";
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap } from "@codemirror/language";
import { lineNumbers, highlightActiveLineGutter, highlightSpecialChars, dropCursor, highlightActiveLine, keymap } from "@codemirror/view";
import { closeBrackets, autocompletion, closeBracketsKeymap } from "@codemirror/autocomplete";
import { highlightSelectionMatches } from "@codemirror/search";
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";


const basic_extensions = [
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
        ...historyKeymap,
        ...foldKeymap,
    ]),
]

export default function get_extensions(line_numbers: boolean, active_line: boolean, match_brackets: boolean, highlight_match: boolean) {
    let custom_extensions: Extension[];
    if (line_numbers) {
        custom_extensions.push(lineNumbers());
    }
    if (active_line) {
        custom_extensions.push(highlightActiveLine());
        custom_extensions.push(highlightActiveLineGutter());
    }
    if (match_brackets) {
        custom_extensions.push(bracketMatching());
        custom_extensions.push(closeBrackets());
    }
    if (highlight_match) {
        custom_extensions.push(highlightSelectionMatches());
    }

    return [...basic_extensions, ...custom_extensions];
}