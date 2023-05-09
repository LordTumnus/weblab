# PROGRESS

Progress bar

## Properties

| Name 	    | Type  | Description                       |
|-------	|:-:	|------------------------------	|
| ProgressType     	| `"linear"\|"circular"`| Specifies the type of progressbar 	|
| Value  | `double`	| The progress to be displayed, specified as a number between 0 and 1                       	|
| Indeterminate | `logical` | If the progress is indeterminate. If true, the current `value` property does not have an effect on the progress bar
| ShowValue | `logical` | Show the value as text. For a `linear` progressbar, the text is shown to the right of the bar (which shrinks to fit the text) For a `circular`bar, the text is shown at its center
| BorderType | `"unset"\|"pill"` | Select the border type. If `unset`, the borders are square; if `pill`, the borders are rounded
| StrokeWidth | `double` | For circular progress bars only , the circles line-width as a percentage of the radius (between 0 and 1)


## Methods


## Events


## [Styling](../styling.md) 

### Linear progress

| Selector  	| Description   	|
|:-:	|---	|
| `&`   | Root of the progressbar|
| `.progress__linear-root`   | Element containing the track and the bar, but not the text|
| `.progress__linear-track`  | \<span> with the track element|
| `.progress__linear-track.progress__linear-pill-border`  | Progressbar when the border type is set to `pill`|
| `.progress__linear-bar`  | \<span> with the bar element. Its `--progress` property controls the vale of the element|
| `.progress__linear-bar.progress__linear-indeterminate`  | Bar when indeterminate is set to true (animated)|
| `.progress__linear-text`  | Displays the value of the current progress|


### Circular progress

| Selector  	| Description   	|
|:-:	|---	|
| `&`   | Root of the progressbar|
| `.progress__circular-root`   | \<span> containing the svg with the circular bar|
| `.progress__circular-root.progress__circular-root--indeterminate`|Animation of the root when `indeterminate` is true|
| `.progress__circular-root > svg.progress__circular-circle--indeterminate`| Animation of the circles when `indeterminate` is true|
| `.progress__circular-track`  | svg circle containing the track|
| `.progress__circular-bar`  | svg circle containing the bar|
| `.progress__circular-text`  | Controls the appearance of the text value of the progressbar|

> Note: Use SVG properties (such as [`stroke`](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial/Fills_and_Strokes)) to control the colors of the circles. It might be the case that a high CSS specificity is needed to modify those properties (see examples)
## Example

### Linear
Creation:

```matlab
% Create the progress bar
p = weblab.components.Progress();
p.ProgressType = "linear";
p.BorderType = "pill";
p.Indeterminate = true;

% Insert it into a small frame
f = weblab.internal.Frame();
f.Position = [50, 50, 200, 20];
f.insert(p);
```


Styling:

```matlab
p.pstyle("& .progress__linear-track", "backgroundColor", "#edd9f1");
p.pstyle("& .progress__linear-bar", "backgroundColor", "#c60ceb");
```

### Circular

Creation:

```matlab
% Create the progress bar
p = weblab.components.Progress();
p.ProgressType = "circular";
p.BorderType = "pill";
p.Indeterminate = true;

% Insert it into a frame
f = weblab.internal.Frame();
f.Position = [50, 50, 200, 200];
f.insert(p);
```


Styling:

```matlab
p.pstyle("& .progress__circular-root > svg > .progress__circular-track", "stroke" , "#edd9f1");
p.pstyle("& .progress__circular-root > svg > .progress__circular-bar", "stroke", "#c60ceb");
```

## Credits

- [Svelte](https://svelte.dev/) 
