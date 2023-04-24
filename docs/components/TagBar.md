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


## Credits

This component uses the amaing [Tagify](https://github.com/yairEO/tagify) library.