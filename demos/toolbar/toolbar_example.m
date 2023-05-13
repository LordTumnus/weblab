function toolbar_example()
% TOOLBAREXAMPLE
% Example that shows what can be achieved with the HTMLContainer component.
% Creates a toolbar with buttons and positions it on top of a code editor. By
% pressing the buttons, the user can control stuff like copying the code or 
% inserting code


fig = uifigure();
layout = uigridlayout(fig, "RowHeight", {'1x'}, "ColumnWidth", {'1x'}, ...
                           "RowSpacing", 1, "Padding", 2); 

% Create the container and its frame
frame = weblab.internal.Frame(layout);
container = weblab.components.HTMLContainer(); 
toolbarButtons = createToolbar(container);
frame.insert(container);

% Create the editor
editor = weblab.components.CodeEditor();
editor.WrapLines = true;
editor.insertText("% Toolbar example" + newline + newline);
container.insert(editor);

% Style the container and the editor
applyStyle(container);
editor.style("flexGrow","1");


% Add listeners to buttons
toolbarButtons(1).addEventListener("click",@(e) editor.insertText("function myfunction()"+newline+newline+"end"+newline));
toolbarButtons(2).addEventListener("click",@(e) editor.insertText("classdef MyClass"+newline+newline+"    properties"+newline+newline+"    end"+newline+newline+"    methods"+newline+newline+"    end"+newline+newline+"end"));
toolbarButtons(3).addEventListener("click",@(e) clipboard("copy", editor.fetchValue().wait().Value));
toolbarButtons(4).addEventListener("click",@(e) evalin("base", editor.fetchValue().wait().Value));
end


function li = createToolbar(container)

div = container.appendElement("div");
div.setAttribute("class","my-toolbar");
ul = div.appendElement("ul"); 
li = addButtons(ul);

end

function li = addButtons(ul)
n = 4;
li  = weblab.components.pseudo.HTMLElement.empty(0,n);
svg = weblab.components.pseudo.HTMLElement.empty(0,n);

for i = 1:n
    li(i)  = ul.appendElement("li");
    a      = li(i).appendElement("a");
    svg(i) = a.appendElement("svg", "http://www.w3.org/2000/svg");
    svg(i).setAttribute("viewBox", "0 0 1024 1024");
end

createPaths(svg);

end

function createPaths(svg)
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

container.style("display_","flex", ...
    "flexDirection", "column", ...
    "overflow", "hidden");

container.pstyle("& .my-toolbar",...
        "backgroundColor", "#f0f6ff", ...
        "position", "relative", ...
        "paddingRight", "2px", ...
        "display_", "flex", ...
        "justifyContent", "right", ...
        "alignItems", "center", ...
        "height", "56px");

container.pstyle("& ul", ...
        "height", "100%", ...
        "display_", "flex", ...
        "justifyContent", "right", ...
        "alignItems", "flex-start", ...
        "listStyle", "none", ...
        "overflow", "hidden");

container.pstyle("& li>a", ...
         "backgroundColor", "white", ...
         "textDecoration", "none", ...
         "display_", "flex", ...
         "justifyContent", "center", ...
         "alignItems", "center", ...
         "padding", "16px", ...
         "position", "relative");

container.pstyle("& li>a:hover", ...
         "cursor","pointer");


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

container.pstyle("& li>a:hover::after", ...
         "opacity", "1");

container.pstyle("& li>a>svg", ...
         "width", "24px", ...
         "height", "24px", ...
         "color", "#97adc6");

end

