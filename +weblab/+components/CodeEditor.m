classdef CodeEditor < weblab.internal.FrameComponent & ...
        weblab.components.mixin.Styled

    properties (SetObservable, Description = "CanBeStained")

        % VALUE: Text contained within the editor
        Value string = string.empty();

        % THEME: Theme used in the editor
        Theme (1,1) string {mustBeMember(Theme, ["light","dark"])} = "light";

    end

    events (Description = "HasCallbackProperty")
        % VALUECHANGED: Text in the editor has been modified 
        ValueChanged
    end


    methods 
        function this = CodeEditor()
            addlistener(this, "ValueChanged", ...
                @(~,e) this.changePropertiesWithoutNotifyingView("Value", e.Data));
        end
    end


end
