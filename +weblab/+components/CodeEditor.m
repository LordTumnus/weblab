classdef CodeEditor < weblab.internal.FrameComponent & ...
        weblab.components.mixin.Styled

    properties (SetObservable, Description = "CanBeStained")

        % VALUE: Text contained within the editor
        Value string = string.empty();

        % THEME: Theme used in the editor
        Theme (1,1) string {mustBeMember(Theme, ["light","dark"])} = "light";

        % EDITABLE: Whether the user can write text in the editor
        Editable (1,1) logical = true;

        % WRAPLINES: If a line exceeds the width of the editor, break it into
        % more lines (not counted as a new line number). If false, scroll to see
        % the overflow
        WrapLines (1,1) logical = false;

    end

    events (Description = "HasCallbackProperty")
        % VALUECHANGED: Text in the editor has been modified 
        ValueChanged
    end


    methods 
        function this = CodeEditor()
            % CODEEDITOR constructor
            addlistener(this, "ValueChanged", ...
                @(~,e) this.changePropertiesWithoutNotifyingView("Value", e.Data));
        end

        function insertText(this, text)
            % INSERTTEXT writes the input text into the editor at the current
            % cursor offset. The cursor will also be moved to the end of the
            % text
            arguments
                this (1,1) weblab.components.CodeEditor
                text (1,1) string
            end
            this.publish(weblab.event.Event("insert_text", text));
        end

        function replaceSelection(this, text)
            % REPLACESELECTION changes the text under the current selection by
            % the new one. If there is nothing selected, the text is inserted at 
            % cursor just like INSERTTEXT
            arguments
                this (1,1) weblab.components.CodeEditor
                text (1,1) string
            end
            this.publish(weblab.event.Event("replace_text", text));
        end

        function moveCursorToOffset(this, cursorOffset) 
            % MOVECURSORTOOFFSET positions the cursor at the specified offset
            % (number of UTF-16 chars from the start of the document). The
            % start of the document has an offset of 1
            arguments
                this (1,1) weblab.components.CodeEditor
                cursorOffset (1,1) {mustBeCursorOffset}
            end
            if isnumeric(cursorOffset)
                cursorOffset = cursorOffset - 1;
            end
            this.publish(...
                weblab.event.Event("move_cursor_offset", cursorOffset));
        end

        function moveCursorToPosition(this, cursorPosition) 
            % MOVECURSORTOPOSITON positions the cursor at the specified postion,
            % specified as a [line, char] pair. If the line exceeds the number
            % of lines in the document, the cursor is positioned at the last
            % line. And if the character exceeds the lines count, then the
            % cursor is positioned at the end of the line
            arguments
                this (1,1) weblab.components.CodeEditor
                cursorPosition (1,2) {mustBeLineAndNumber}
            end
            cursorPosition(2) = cursorPosition(2) - 1;
            this.publish(...
                weblab.event.Event("move_cursor_position", cursorPosition));
        end

        function selectFromOffset(this, from, to)
            % SELECTFROMOFFSET selects the text contained within the offsets
            % specified by "from" and "to"
            arguments
                this (1,1) weblab.components.CodeEditor
                from (1,1) {mustBeCursorOffset}
                to (1,1) {mustBeCursorOffset}
            end
            % JS offsets start from 0
            if isnumeric(from)
                from = from - 1;
            end
            if isnumeric(to)
                to = to - 1;
            end
            this.publish(...
                weblab.event.Event("select_offset", struct("from",from,"to",to)));
        end

        function selectFromPosition(this, from, to)
            % SELECTFROMPOSITION selects the text contained within the positions
            % specified by "from" and "to" (given as [line, char] pairs)
            arguments
                this (1,1) weblab.components.CodeEditor
                from (1,2) {mustBeLineAndNumber}
                to (1,2) {mustBeLineAndNumber}
            end
            from(2) = from(2) - 1;
            to(2) = to(2) - 1;
            this.publish(...
                weblab.event.Event("select_position", struct("from",from,"to",to)));
        end

        function promise = fetchCursorOffset(this)
            % FETCHCURSOROFFSET returns a promise that resolves into the
            % current cursor offset
            arguments
                this (1,1) weblab.components.CodeEditor
            end
            promise = this.fetch("cursor_offset").then(@(x) x+1);
        end

        function promise = fetchCursorPosition(this)
            % FETCHCURSORPOSITION returns a promise that resolves into the
            % current cursor position
            arguments
                this (1,1) weblab.components.CodeEditor
            end
            promise = this.fetch("cursor_position").then(@(x) [x(1) x(2)+1]);
        end

        function promise = fetchValue(this)
            % FETCHVALUE returns a promise that resolves into the
            % current value of the editor. 
            % Note: The Value property is updated at a minimum rate of 500ms 
            % (it is debounced at that rate), so the outputs of Value and
            % fetchValue might be different.
            % For example
            % >> editor = weblab.components.CodeEditor();
            % >> editor.insertText("Hello world")
            % >> v_prop = editor.Value; % "";
            % >> v_fetch = editor.fetchValue().wait().Value; % "Hello world"
            arguments
                this (1,1) weblab.components.CodeEditor
            end
            promise = this.fetch("value").then(@(x) string(x));
        end



        function focus(this, tf)
            % FOCUS sets or removes the focus from the editor. 
            % Note: The cursor is not visible when the editor is not focused.
            % This method is usefull to show the cursor
            arguments
                this (1,1) weblab.components.CodeEditor
                tf (1,1) logical = true;
            end
            this.publish(weblab.event.Event("focus", tf));
        end
    end


end


function mustBeCursorOffset(position) 
% MUSTBECURSOROFFSET checks that the specified position is one of the
% following;
% - An integer number greater than 0 (start = 1)
% - One of the following: "start", "end", "current"

assert(any(strcmp(position, ["start","end","current"])) || ...
    (round(position) == position && position > 0 ));
end

function mustBeLineAndNumber(position)
% MUSTBELINEANDNUMBER checks that the position is composed of a line number and 
% a character location
assert(round(position(1)) == position(1) && ...
       position(1) >= 1 && ...
       round(position(2)) == position(2) && ...
       position(2) >=1);
end
