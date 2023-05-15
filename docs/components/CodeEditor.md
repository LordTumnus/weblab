# PROGRESS

Code Editor

## Properties

| Name 	    | Type  | Description                       |
|-------	|:-:	|------------------------------	|
| Value  | `string`	| The text displayed in the Editor                 	|
| Theme | `"light"\|"dark"` | Colors used in the editor (`light` resembles matlab default theme, `dark` is vscode dark theme)
| Editable | `logical` | Whether the content of the editor can be edited by the user
| LineNumbers | `logical` | Show or hide the lines on the left of the editor
| HighlightActiveLine | `logical` | Add a background color to the line currently being focused
| WrapLines | `logical` | Whether lines are wrapped if they exceed the editors width
| MatchBrackets | `logical` | Whether to automatically create a closing bracket when the user types an opening one
| HighlightMatchingWords | `logical` | Highlight words matching the currently selected one
| ValueChangedFcn | `function_handle` | Function executed after the value of the editor changes


> Note: The `Value` property comes [debounced](https://www.freecodecamp.org/news/javascript-debounce-example/) from the view, with a debounce time of 500ms. That means that it updates **minimum** at a 500ms rate. If you need to query the real-time `Value`, use `fetchValue` instead.

## Methods

| Name  	| Description   	|
|-------	|:-:	|
| insertText   	| Inject text at the current cursor position |
| replaceSelection  | Replace the current selection by a new text value. If no text is selected, then the text is inserted at the current cursor position |
| undo  | Undo the last history event |
| redo  | Redo the last undone history event |
| moveCursorToOffset  	| Move the cursor to a specific offset in the document  |
| moveCursorToPosition  	| Move the cursor to a specific position \[row, column\] in the document  |
| selectFromOffset  	| Select the text contained within 2 offsets |
| selectFromPosition  	|Select the text contained within 2 positions (given as \[row, column\] pairs)  |
| fetchCursorOffset  	| Get a promise that resolves into the current cursor offset from the beginning of the document  |
| fetchCursorPosition  	| Get a promise that resolves into the current cursor position, as a \[row, column\]|
| fetchValue  	| Get a promise that resolves into the value of the document|


## Events

| Name 	    | Description                       |
|-------	|:-:	|
| ValueChanged  | Event triggered when the value of the editor is changed by the user |    

## [Styling](../styling.md) 

See the documentation for the [Things You can Style](https://codemirror.net/examples/styling/#:~:text=Things%20you%20can%20Style) in CodeMirror V6 

## Example

Creation:

```matlab
% Create the editor
e = weblab.components.CodeEditor();
e.Value = "% This is a code editor example" + newline + "a = 1 + 1;";
e.Theme = "dark";

% Insert it into a frame
uif = uifigure(); 
gl = uigridlayout(uif, "RowHeight", {'1x'}, "ColumnWidth", {'1x'}, "Parent", uif);
f = weblab.internal.Frame("Parent", gl);
f.insert(e);
```

Methods

```matlab
% Inject some text
e.insertText("%This is a comment on the first line" + newline, "start");
e.insertText(newline+ "%This is a comment on the last line", "end");

% Inject some text
e.moveCursorToOffset("start");
e.insertText("%This is a comment on the first line" + newline);
e.moveCursorToOffset("end");
e.insertText(newline+ "%This is a comment on the last line");

% Fetch the value of the document, since "Value" hasn't updated yet on Matlab. 
% Use the value to move the cursor to the middle of the document and insert some text
v = e.fetchValue().then(@(value) e.moveCursorToOffset(ceil(strlength(value)/2))).then(@(value) e.insertText(newline+"I go in the middle"+newline));

```

## Credits

- [CodeMirror](https://codemirror.net/)
- [CodeMirror Svelte Wrapper](https://github.com/touchifyapp/svelte-codemirror-editor)