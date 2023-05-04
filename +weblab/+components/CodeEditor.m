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

        function insertText(this, text, cursorPosition)
            % INSERTTEXT writes the input text into the editor at the specified
            % cursor position. If no position is specified, the text is appended
            % at the current cursor position
            arguments
                this (1,1) weblab.components.CodeEditor
                text (1,1) string
                cursorPosition (1,1) {mustBeCursorPosition} = "current";
            end

            % Numbers in js start from 0
            if isnumeric(cursorPosition)
                cursorPosition = cursorPosition - 1;
            end
            data = struct("text", text, "pos", cursorPosition);
            this.publish(weblab.event.Event("insert_text", data));
        end

        function moveCursor(this, cursorPosition) 
            % MOVECURSOR positions the cursor at the specified location
            arguments
                this (1,1) weblab.components.CodeEditor
                cursorPosition (1,1) {mustBeCursorPosition}
            end
            this.publish(weblab.event.Event("move_cursor", cursorPosition));
        end
    end


end


function mustBeCursorPosition(position) 
% MUSTBECURSORPOSITION checks that the specified position is one of the
% following;
% - An integer number greater than 0 (start = 1)
% - One of the following: "start", "end", "current"

assert((isinteger(position) && position > 0 ) || ...
    any(strcmp(position, ["start","end","current"])));
end
