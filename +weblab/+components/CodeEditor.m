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

        function insertTextAtOffset(this, text, cursorOffset)
            % INSERTTEXT writes the input text into the editor at the specified
            % cursor offset. If no position is specified, the text is appended
            % at the current cursor position
            arguments
                this (1,1) weblab.components.CodeEditor
                text (1,1) string
                cursorOffset (1,1) {mustBeCursorOffset} = "current";
            end

            % Numbers in js start from 0
            if isnumeric(cursorOffset)
                cursorOffset = cursorOffset - 1;
            end
            data = struct("text", text, "pos", cursorOffset);
            this.publish(weblab.event.Event("insert_text_offset", data));
        end

        function insertTextAtPosition(this, text, cursorPosition)
            % INSERTTEXT writes the input text into the editor at the specified
            % cursor position (see MOVECURSORPOSITION for details on how the
            % position is specified)
            arguments
                this (1,1) weblab.components.CodeEditor
                text (1,1) string
                cursorPosition (1,2) {mustBeLineAndNumber}
            end

            cursorPosition(2) = cursorPosition(2) - 1;
            data = struct("text", text, "pos", cursorPosition);
            this.publish(weblab.event.Event("insert_text_position", data));
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

        function promise = fetchCursorOffset(this)
            % FETCHCURSOROFFSET returns a promise that resolves into the
            % current cursor offset
            promise = this.fetch("cursor_offset").then(@(x) x+1);
        end

        function promise = fetchCursorPosition(this)
            % FETCHCURSORPOSITION returns a promise that resolves into the
            % current cursor position
            promise = this.fetch("cursor_position").then(@(x) [x(1) x(2)+1]);
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
