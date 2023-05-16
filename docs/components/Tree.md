# TREE


## Properties

| Name 	    | Type  | Description                       |
|-------	|:-:	|------------------------------	|
| Data     	| `struct`| The nodes that will be rendered inside the tree. Nodes must be in the form `struct("name": string,"chidlren": node[],"icon"?: string)` 	|
| HighlightOnFilter  | `logical`	| Apply highlighting colors to the nodes when the `filter` method is called                        	|
| ImageMap  | `struct`	| Map names to icons                       	|

## Methods

| Name  	| Description   	|
|:-:	|---	|
| expandAll   	| Expand the branches in the tree to show all nodes |
| collapseAll  	| Collapse all branches in the tree  	|
| filter  	    | Redraw the tree by filtering the nodes that match the input name and type.<br> Allowed types of filtering are: `leaf`, `~leaf`, `branch`, `~branch`. </br>  	|

## Events

## [Styling](../styling.md) 

| Selector  	| Description   	|
|:-:	|---	|
| `&`   | Root of the tree. Use it to change default fonts and colors|
| `.treeview`   	| The scrollable container of the tree. Target this element to modify the scrolling behaviour *and* background color |
| `li`   	| Nodes. Every node contains a `.treeview__node` where the text is rendered. Branches additionally contain an \<ul> to hold their children. Target the `:before` and `:after` pseudoselectors to modify the vertical and horizontal lines when a branch is expanded|
| `li.treeview__branch`   	| Branch nodes   |
| `li.treeview__leaf`   	| Leaf nodes   |
| `ul`   	| Children containers for branches|
| `.treeview__node`   	| \<div> displaying the nodes information. They are formed by an \<i> and a \<div>|
| `.treeview__node > i`   	| Node icon (branches have an svg inside). Use it to set the color|
| `.treeview__node > div`   | Node text|
| `.treeview__node > div > mark`   | Highlighted portion of the node|

## Example

> Hint: Use the [`dir2struct`](/%2Bweblab/%2Butils/dir2struct.m) method to convert a folder structure into a nested struct that can be used in a Tree

Creating the tree:

```matlab
% Convert the current folder into a struct 
[data, icons] = weblab.utils.dir2struct(pwd);

% Initialize the frame and the tree
f = weblab.internal.Frame();
t = weblab.components.Tree();
t.ImageMap = icons;
t.Data = data;

% Insert the tree in the frame
f.insert(t);
```

Filtering:
```matlab
% Filter all leafs that are .m files, don't contain the color text and are inside a package"
t.filter(".m", "leaf", "text", "~leaf", "+", "branch");
```


Styling:

```matlab
% Change the font size
t.style("fontSize", "30px");
% Target all the leafs and make their font color red on hover
t.pstyle("&  li.treeview__leaf:hover", "color", "red");
% Target all the branches and make their background color yellow
t.pstyle("&  li.treeview__branch > .treeview__node > div", "backgroundColor", "#e6f7ff");
% Change the folder icon color
t.pstyle("&  li.treeview__branch > .treeview__node > i", "color", "#04f3cc");
% Change the folder icon color
t.pstyle("&  .treeview__node mark", "backgroundColor", "#d9b3ff", "color", "red");
```
