classdef HTMLElement < weblab.components.pseudo.PseudoComponent & ...
                       matlab.mixin.Heterogeneous


    properties
        Type (1,1) string
    end

    properties (Access = private)
        Callbacks struct = struct();
    end

    methods 
        function this = HTMLElement(type)
            this.Type = type;
        end

        function clearInlineStyle(this)
            this.setAttribute("style","");
        end


        function setInlineStyle(this, styleProp, styleValue)
            arguments
                this (1,1) weblab.components.pseudo.HTMLElement
            end
            arguments (Repeating)
                styleProp (1,1) weblab.style.CSSProperties
                styleValue (1,1) string
            end
            styleObj = cell(1, 2*numel(styleProp));
            styleObj(1:2:end) = cellfun(@(x) string(x),styleProp,'uni',0);
            styleObj(2:2:end) = styleValue;
            this.publish("inline_style", struct(styleObj{:}));
        end

        function setAttribute(this, name, value)
            arguments
                this (1,1) weblab.components.pseudo.HTMLElement
            end
            arguments (Repeating)
                name (1,1) string
                value (1,1) string
            end
            cellfun(@(x,y) this.publish(...
                "set_attribute", struct("attribute", x, "value", y)),...
                name, value);
        end

        function addEventListener(this, event, eventProps, callback, mode, time)
            arguments
                this (1,1) weblab.components.pseudo.HTMLElement
                event (1,1) string
                eventProps string
                callback (1,1) function_handle
                mode (1,1) string {mustBeMember(mode, ["normal","debounce","throttle"])} = "normal";
                time (1,1) double = 0;
            end
            listener = struct();
            listener.event = event;
            listener.back = eventProps;
            listener.mode = struct("type", mode, "time", time);

            this.Callbacks.(event) = callback;
            this.publish("event_listener", listener)
        end

        function removeEventListener(this, event)
            if isfield(this.Callbacks, event)
                this.Callbacks = rmfield(this.Callbacks, event);
                this.publish("remove_listener", event);
            end
        end

    end


    methods
        function handleEvent(this, event, data) 
            if isfield(this.Callbacks, event)
                feval(this.Callbacks.(event), data);
            end
        end
    end
end