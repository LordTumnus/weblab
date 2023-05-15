function toolbar_example()
% TOOLBAREXAMPLE
% Example that shows what can be achieved with the HTMLContainer.
% This demo creates a toolbar with buttons and positions it on top of a code
% editor. The toolbar include buttons that insert text into the editor, copy its
% contents to the clipboard, or run the code in the base workspace

% ** README **
% This example is embedded on a Matlab function. If you are feeling adventurous,
% you can try converting this into a custom component (a class that inherits
% from matlab.ui.componentcontainer.ComponentContainer), and adding properties
% to control things like colors, button callback functions, images, ...
% If you submit a pull request, I can review it and add it to the repo as a
% custom component


% Create a figure and a layout filling all the space
fig = uifigure();
layout = uigridlayout(fig, "RowHeight", {'1x'}, "ColumnWidth", {'1x'}, ...
                           "RowSpacing", 1, "Padding", 2); 

% Create the frame where the container and editor will be attached
% There are 2 possible strategies:
% 1) Create 2 frames, one for the toolbar and another one for the code editor
%    (and modify the grid layout to have 2 rows)
% 2) Create 1 frame, and inside it, inject the toolbar and the editor
%
% Option 2 is significantly faster, since the JavaScript weblab code only has to
% be executed once! That's the beauty of the weblab framework: components (like
% the code editor) can be inserted into other components (that inherit from the
% DynamicContainer class, like the html container). The obvious drawback is that
% developers need to clearly understand CSS (specially flex & grid displays) to 
% position the component inside the container
frame = weblab.internal.Frame(layout);

% Create the HTMLContainer and add buttons to it 
container = weblab.components.HTMLContainer(); 
toolbarButtons = createToolbar(container);

% Create the CodeEditor
editor = weblab.components.CodeEditor();
editor.WrapLines = true;
editor.insertText("% Toolbar example" + newline + newline);

% Use CSS to style the container and the editor. See APPLYSTYLE down below to
% see the details
applyStyle(container);
editor.style("flexGrow","1");

% Insert the components. The container inside the frame, and the editor inside
% the container
frame.insert(container);
container.insert(editor);

% Add listeners to buttons
% This part showcases how can we attach an HTML event listener to a pseudo
% HTMLElement
% Button 1) Inserts a function template into the editor
toolbarButtons(1).addEventListener("click", ...
    @(e) editor.insertText("function myfunction()"+newline+newline+"end"+newline));

% Button 2) Inserts a class template
toolbarButtons(2).addEventListener("click", ...
    @(e) editor.insertText("classdef MyClass < handle" + newline + newline + ...
    "    properties" + newline + newline + "    end"   + newline + newline + ...
    "    methods"    + newline + newline + "    end"   + newline + newline + ...
    "end" + newline));

% Button 3) Copies all the text into the clipboard. Can also be achieved with
% ctrl+A, ctrl+c (cmd for mac). Since the editor value property is debounced,
% it's more fault-proof to fetch it. Another option would be to debounce the
% click listener also to the 500ms of the editor
%
%toolbarButtons(3).addEventListener("click", ...
%    @(e) clipboard("copy", editor.fetchValue().wait().get()));
toolbarButtons(3).addEventListener("click", ...
    @(e) clipboard("copy", editor.Value), "mode", "debounce", "time", 500);

% Button 4) Runs the code inside the base workspace. Same as button3, the
% listener could be debounced instead of fetching the value
toolbarButtons(4).addEventListener("click", ...
    @(e) evalin("base", editor.fetchValue().wait().get()));
end

function li = createToolbar(container)
% CREATETOOLBAR appends a <div> element to the container, and then an 
% unordered list <ul> into the div. The buttons are the list elements, which are
% created in ADDBUTTONS

div = container.appendElement("div");
div.setAttribute("class","my-toolbar");
ul = div.appendElement("ul"); 
li = addButtons(ul);
end

function li = addButtons(ul)
% ADDBUTTONS creates 4 buttons in the toolbar. Buttons have the following HTML
% form:
% <li> 
%   <a>
%     <svg><path></path></svg>
%   </a>
% </li>

n = 4;
li  = weblab.components.pseudo.HTMLElement.empty(0,n);
svg = weblab.components.pseudo.HTMLElement.empty(0,n);

% Create the <li>,<a> and <svg> elements
for i = 1:n
    li(i)  = ul.appendElement("li");
    a      = li(i).appendElement("a");
    svg(i) = a.appendElement("svg", "http://www.w3.org/2000/svg");
    % The viewbox specifies the coordinates of the paths rendered inside the svg
    svg(i).setAttribute("viewBox", "0 0 1024 1024"); 
end
% Create the paths
createPaths(svg);

end

function createPaths(svg)
% CREATEPATHS creates the svg paths for the buttons. I took the icons from
% https://www.veryicon.com

p1 = svg(1).appendElement("path", "http://www.w3.org/2000/svg");
p1.setAttribute("fill","black","d","M665.6 225.706667c-46.933333-4.266667-88.32 30.293333-92.586667 77.653333L562.346667 426.666667H682.666667v85.333333h-128l-18.773334 216.32a170.069333 170.069333 0 0 1-184.746666 154.88 170.965333 170.965333 0 0 1-130.56-79.786667l64-64c10.24 31.573333 38.4 55.893333 73.813333 58.88 46.933333 4.266667 88.32-30.293333 92.586667-77.653333L469.333333 512H341.333333v-85.333333h135.253334l11.52-130.986667c8.106667-93.866667 90.88-163.413333 184.746666-154.88 55.893333 4.693333 102.826667 35.84 130.56 79.786667l-64 64c-10.24-31.573333-38.4-55.893333-73.813333-58.88z");

p2 = svg(2).appendElement("path", "http://www.w3.org/2000/svg");
p2.setAttribute("fill","black","d","M480 484.416V448h32v36.544l313.088-177.6L496 116.96 168.224 306.208 480 484.448z m342.816 233.92l-39.808-23.04 16.032-27.68 39.072 22.624V336.32L512 521.312v376.512l310.816-179.456z m-668.928-26.24l42.24-24.48 16 27.68-41.376 24L480 897.792V521.28L153.888 334.88v357.184zM496 80l374.112 216v432L496 944 121.888 728V296L496 80zM267.52 663.232l-16-27.68 55.36-32.064 16.032 27.68-55.36 32.064z m110.784-64.128l-16.032-27.68 55.36-32.064 16.064 27.68-55.392 32.064z m349.312 64.128l-55.36-32.064 16-27.68 55.392 32.064-16 27.68z m-110.784-64.128l-55.36-32.064 16-27.68 55.424 32.064-16.064 27.68zM512 320v64.256h-32V320h32z m0-128v64.256h-32V192h32z");

p31 = svg(3).appendElement("path", "http://www.w3.org/2000/svg");
p32 = svg(3).appendElement("path", "http://www.w3.org/2000/svg");
p31.setAttribute("fill","black","d","M768 981.333333H256c-72.533333 0-128-55.466667-128-128V256c0-72.533333 55.466667-128 128-128h85.333333c25.6 0 42.666667 17.066667 42.666667 42.666667s-17.066667 42.666667-42.666667 42.666666H256c-25.6 0-42.666667 17.066667-42.666667 42.666667v597.333333c0 25.6 17.066667 42.666667 42.666667 42.666667h512c25.6 0 42.666667-17.066667 42.666667-42.666667V256c0-25.6-17.066667-42.666667-42.666667-42.666667h-85.333333c-25.6 0-42.666667-17.066667-42.666667-42.666666s17.066667-42.666667 42.666667-42.666667h85.333333c72.533333 0 128 55.466667 128 128v597.333333c0 72.533333-55.466667 128-128 128z");
p32.setAttribute("fill","black","d","M640 298.666667H384c-46.933333 0-85.333333-38.4-85.333333-85.333334V128c0-46.933333 38.4-85.333333 85.333333-85.333333h256c46.933333 0 85.333333 38.4 85.333333 85.333333v85.333333c0 46.933333-38.4 85.333333-85.333333 85.333334zM384 128v85.333333h256V128H384z");

p41 = svg(4).appendElement("path", "http://www.w3.org/2000/svg");
p42 = svg(4).appendElement("path", "http://www.w3.org/2000/svg");
p41.setAttribute("fill","black","d","M512 960A448 448 0 1 0 512 64a448 448 0 0 0 0 896z m0 64A512 512 0 1 1 512 0a512 512 0 0 1 0 1024z");
p42.setAttribute("fill","black","d","M448 422.656v217.088L621.632 531.2 448 422.656z m14.336 283.584A51.2 51.2 0 0 1 384 662.848V399.552a51.2 51.2 0 0 1 78.336-43.392l210.56 131.648a51.2 51.2 0 0 1 0 86.784l-210.56 131.648z");

end

function applyStyle(container)
% APPLYSTYLE adds some CSS style to the container and the toolbar


% The container has a FLEX column layout
% (https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
container.style("display_","flex", ...
    "flexDirection", "column", ...
    "overflow", "hidden");

% Line 48: that the CodeEditor has a flex-grow attribute of 1, so its size grows
% to fit all the empty space from the container

% Line 91: we added a class to the toolbar <div>. We use that as a selector for
% pstyle to style the button container. 
% - again, flex layout with the <ul> aligned to the right 
% - size is fixed to 56px
% - background color could be switched with the dark/light themes of the editor
container.pstyle("& .my-toolbar",...
        "backgroundColor", "#f0f6ff", ...
        "position", "relative", ...
        "paddingRight", "2px", ...
        "display_", "flex", ...
        "justifyContent", "right", ...
        "alignItems", "center", ...
        "height", "56px");

% Style also the unordered list. Similar to the "my-toolbar", we right align the
% buttons
container.pstyle("& ul", ...
        "height", "100%", ...
        "display_", "flex", ...
        "justifyContent", "right", ...
        "alignItems", "flex-start", ...
        "listStyle", "none", ...
        "overflow", "hidden");

% Style the button a elements. 
% - white background
% - padding to center the svgs: 
%     * Padding takes 16px * 2 = 32px
%     * SVG width and height equal to 56 - 32 = 24px
container.pstyle("& li>a", ...
         "backgroundColor", "white", ...
         "textDecoration", "none", ...
         "display_", "inline-block", ...
         "padding", "16px", ...
         "position", "relative");

% When hovered, buttons should display a cursor pointer
container.pstyle("& li>a:hover", ...
         "cursor","pointer");


% I also added an ::after element that creates some shadows around the buttons 
container.pstyle("& li>a::after", ...
         "content", "''", ...
         "position", "absolute",...
         "width", "100%", ...
         "height", "100%",...
         "left", "0",...
         "top", "0",...
         "boxShadow", "0 0 8px -2px rgba(0, 0, 0, 0.3)", ...
         "opacity", "0",...
         "zIndex","10", ...
         "transition", "opacity 0.3s");

% The ::after element is transparent until the user hovers the button
container.pstyle("& li>a:hover::after", ...
         "opacity", "1");

% SVG sizing (24px due to toolbar height and internal padding!)
container.pstyle("& li>a>svg", ...
         "width", "24px", ...
         "height", "24px");
% If we wanted to style the SVG color, we wouldn't target the "color" property,
% but the "fill" 
% container.pstyle("& li>a>svg", ...
%        "fill", "red");

end

