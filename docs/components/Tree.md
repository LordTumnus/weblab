# TREE


## Properties

| Name 	    | Type  | Description                       |
|-------	|:-:	|------------------------------	|
| Data     	| `struct`| The nodes that will be rendered inside the tree. Nodes must be in the form `struct("name",*,"chidlren",[])` 	|
| HighlightOnFilter  | `logical`	| Apply highlighting colors to the nodes when the `filter` method is called                        	|

## Methods

| Name  	| Description   	|
|:-:	|---	|
| expandAll   	| Expand the branches in the tree to show all nodes |
| collapseAll  	| Collapse all branches in the tree  	|
| filter  	    | Redraw the tree by filtering the nodes that match the input name and type.<br> Allowed types of filtering are: `leaf`, `~leaf`, `branch`, `~branch`. </br>  	|

## Events

## [Styling](../styling.md) 