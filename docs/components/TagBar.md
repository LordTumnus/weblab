# TAGBAR

## Properties

| Name 	    | Type  | Description                       |
|-------	|:-:	|------------------------------	|
| Tags     	| `string[]`| List of tags currently appearing in the bar 	|
| Placeholder  | `string`	| Text displayed next to the tags                       	|
| Delimiters | `string[]` | List of strings that determine when a tag is completed
| Duplicates | `logical` | Allow duplicate tags 
| EditTags | `logical` | Allow double-clicking on a tag to edit it
| ValidationPattern | `string` | Regexp used to allow new tags
| Blacklist | `string[]` | Don't allow tags that match any of these values
| Whitelist | `string[]` | Allow only tags that match one of these values

## Methods

| Name  	| Description   	|
|:-:	|---	|
| clearTags   	| Remove all tags from the bar |

## Events

| Name  	| Description   	|
|:-:	|---	|
| TagsChanged   	| [ Debounced ]Triggered whenever a tags is changed or removed |
| Focus   	| Triggered when the tagbar gains focus |
| Blur   	| Triggered when the tagbar loses focus |


## [Styling](../styling.md) 

| Selector  	| Description   	|
|:-:	|---	|
| `&`   | Root of the search bar. Use it to change default fonts and colors|
| `.tagify`   | Element containing the tags|
| `.tagify__tag`   | Tags|

> **Important**: Targeting tag attributes, like their background color, is not straightforward. Instead, you should probably target the css properties defined in the tagify element (see [Tagifys documentation](https://github.com/yairEO/tagify#css-variables)) 


## Example

Creation
```matlab
% Create tagbar
t = weblab.components.TagBar();
t.Tags = ["hello","world"]; % Add tags
t.Placeholder = "Write sth"; % Change placeholder
t.TagsChangedFcn = @(~,e) disp(string(e.Data));

% Insert it into a frame
f = weblab.internal.Frame();
f.insert(t);
````

Styling

```matlab
% Change the background color of the tags to red
t.cssvar("& .tagify", "--tag-bg", "red");
t.cssvar("& .tagify", "--placeholder-color-focus", "green");

```


## Credits

This component uses the amaing [Tagify](https://github.com/yairEO/tagify) library.