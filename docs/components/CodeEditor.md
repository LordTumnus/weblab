# PROGRESS

Code Editor

## Properties

| Name 	    | Type  | Description                       |
|-------	|:-:	|------------------------------	|
| Value  | `string`	| The text displayed in the Editor                 	|
| Theme | `"light"|"dark"` | Colors used in the editor (`light` resembles matlab default theme, `dark` is vscode dark theme)
| Editable | `logical` | Whether the content of the editor can be edited by the user
| WrapLines | `logical` | Whether lines are wrapped if they exceed the editors width
| ValueChangedFcn | `function_handle` | Function executed after the value of the editor changes


## Methods

| Name  	| Description   	|
|:-:	|---	|
| insertText   	| Inject text at the specified position |
| moveCursor  	| Move the cursor to a specific position in the document  	|


## Events

| Name 	     Description                       |
|-------	|------------------------------	|
| ValueChanged  | Event triggered when the value of the editor is changed by the user |    

> Note: The `ValueChanged` method is **debounced**, so it does not update immediately after a change occurs. Be aware of this when reading the `Value` property as well (see the [example](#example))


## [Styling](../styling.md) 

See the documentation for the (Things You can Style)[https://codemirror.net/examples/styling/#:~:text=Things%20you%20can%20Style] in CodeMirror V6 

## Example

Creation:

```matlab
% Create the editor
e = weblab.components.Progress();
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

pause(0.5)
e.insertText(newline + "%This is a comment on the middle of the document" + newline, ceil(strlength(e.Value)/2));
```

Styling:

```matlab

```

## Credits

- [Svelte](https://svelte.dev/) 