<h1 align="center">
  WEBLAB
</h1>

[![View Custom uifugure components on File Exchange](https://www.mathworks.com/matlabcentral/images/matlab-file-exchange.svg)](https://www.mathworks.com/matlabcentral/fileexchange/128439-custom-uifugure-components)

<h4 align="center">A tool for developing custom <em>uifigure</em> components in Matlab</h4>


<p align="center">
  <a href="#how-to-use">How To Use</a> • 
  <a href="#components">Components</a> • 
  <a href="#how-to-make-changes">How To Make Changes</a> •
  <a href="#license">License</a>
</p>



## How To Use

To use a custom component, you will to create a
[Frame](/%2Bweblab/%2Binternal/Frame.m) inside the `uifigure` and then insert
your component into it.

```matlab
% Create the uifigure
uifig = uifigure();
% Create the frame
frame = weblab.internal.Frame("Parent", uifig);
% Initialize your component
myComponent = weblab.components.MyComponent();
% Insert
frame.insert(myComponent);
```

> **Note:** The inserted component will occupy the full height and width of the
> frame. If you want to reposition or resize it inside the figure, use the
> `Position` property of the `Frame`.

## Components

These components are currently supported:

- Tree: [docs](/docs/components/Tree.md) / [src](/%2Bweblab/%2Bcomponents/Tree.m)
- TagBar: [docs](/docs/components/TagBar.md) / [src](/%2Bweblab/%2Bcomponents/TagBar.m)
- TagFilterTree: [docs](/docs/components/TagFilterTree.md) / [src](/%2Bweblab/%2Bcomponents/TagFilterTree.m)
- Progress: [docs](/docs/components/Porgress.md) / [src](/%2Bweblab/%2Bcomponents/Progress.m)

More to come! These are the next planned components:
- Code Editor
- PDF renderer
- Interactive plots

## Developing your own components

WIP

## How To Make Changes

If you make changes to the Typescript source code, you will need to rebuild the
project. For that, you'll first need [Node.js](https://nodejs.org/en/download/)
(which comes with [npm](http://npmjs.com)) installed on your computer.

From a terminal at the project root, type the following commands:

```bash
# Go into the HTML source folder
$ cd +weblab/source

# Install dependencies
$ npm install
```

Now you can make changes in the TS source code, located inside the
[+weblab/source/src](/%2Bweblab/source/src/) subdirectory.

**Important**: Once your changes are complete, rebuild the project by running in
the terminal

```bash
$ npm run build
```
## Issues and PRs

Issues and pull requests are appreciated. I will do my best to take into account your opinions and recommendations

## License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](/LICENSE)

---
