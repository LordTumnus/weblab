# CSS Styling

All the components that inherir from the `weblab.components.mixin.Stylable` support advanced styling rules through their `style` and `pstyle` methods


| Style  	| Description   	|
|:-:	|---	|
| style   	| Apply the CSS style to the HTML element linked to the component |
| pstyle   	| Apply the CSS style to any pseudoselector of the HTML element linked to the component |


## `style`

Targets the whole component. In CSS, properties usually flow down to the descendants of an element. This is not true if the descendants redefine those properties!

>**Important**: CSS property values must always be strings!

```matlab
% create a Tree component
t = weblab.components.Tree();
t.style('fontSize', '50px'); % Increase the font size
% Change font color and background colors
t.style('color', 'red', ...
        'backgroundColor', 'rgb(255 122 127 / 80%)');
```

## `pstyle`

Use SCSS syntax to target pseudoselectors of the main component.
>**Important**: The pseudoselector **must** start with the ampersand (&) character 
```matlab
% create a Tree component
t = weblab.components.Tree();
% target all <li> descendants (tree nodes) and change their color when the user hovers over them
t.pstyle('& li:hover', 'color','red');
```

>Note: If targeting the `:before` or `:after` pseudoselector, take into account that the values of the `contents` CSS property should be a double-string (i.e, `""the-content""`)


## Keyframes & Animations
WIP

## Advanced topics
WIP

## Credits
Styling is achieved thanks to this open-source library: [CSSObj](https://github.com/cssobj/cssobj)