# TAGFILTERTREE


## Properties

| Name 	    | Type  | Description                       |
|-------	|:-:	|------------------------------	|
| NotOperator | `string` | Character used to specify when a tags should be of "~" type (`~leaf`, `~branch`) |
| BranchOperator | `string` | Character used to specify when a tags should be of "branch" type (`~branch`, `~branch`) |
| Searchbar | `weblab.components.TagBar` | [TagBar](/docs/TagBar.md) component |
| Tree | `weblab.components.Tree` | [Tree](/docs/Tree.md#L8) component |
| Data     	| `struct`| [ Dependent ] Tree data 	|
| Tags  | `string[]`	| [ Dependent ] Searchbar tags   |

## Methods


## Events


## [Styling](../styling.md) 

| Selector  	| Description   	|
|:-:	|---	|
| `weblab-tagbar` | Searchbar element (see [docs](/docs/components/TagBar.md))|
|  `weblab-tree`| Tree element (see [docs](/docs/components/Tree.md))|


## Example

```matlab
% Convert the current folder into a struct 
data = weblab.utils.dir2struct(pwd);

% Initialize the frame and the tree
f = weblab.internal.Frame();
t = weblab.components.TagFilterTree();
t.Data = data;
t.Tags = ".m";

% Insert the tree in the frame
f.insert(t);
```
