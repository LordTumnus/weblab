classdef HTMLElement < weblab.internal.pseudo.PseudoComponent & ...
                       matlab.mixin.Heterogeneous


    properties (SetAccess = immutable)
        % TYPE: The tagname of the element. Some valid tagnames are:
        % div, button, span, i, ul, li, ...
        Type (1,1) string
    end

    properties (Access = private)
        % CALLBACKS: Mapping between the elements events and the callback
        % executed when they are triggered (like subscriptions)
        Callbacks struct = struct();
    end

    methods (Access = ?weblab.components.HTMLContainer)
        function this = HTMLElement(type)
            % HTMLELEMENT constructor. 
            % Initializes the type
            this.Type = type;
        end
    end

    methods
        function clearInlineStyle(this)
            % CLEARINLINESTYLE removes the inline style from the element.
            arguments
                this (1,1) weblab.components.pseudo.HTMLElement
            end
            this.setAttribute("style","");
        end

        function element = appendElement(this, type)
            % APPENDELEMENT creates a new element and inserts it inside this one
            arguments
                this (1,1) weblab.components.pseudo.HTMLElement
                type (1,1) string
            end
            element = this.Container.createElement(type);
            this.publish("insert_subhtml",struct("id",element.ID,"type",type));
        end

        function setTextContent(this, text)
            % SETTEXTCONTENT modifies the text contained within the element
            arguments
                this (1,1) weblab.components.pseudo.HTMLElement 
                text (1,1) string
            end
            this.publish("set_text", text);
        end


        function setInlineStyle(this, styleProp, styleValue)
            % SETINLINESTYLE sets the specified css style properties to the
            % element inline style attribute.
            % Inline styles have the highest specificity of all rules
            % Inline properties cannot be removed unless you clear all the style
            % attribute (see CLEARINLINESTYLE). However, their values can be 
            % unset using CSS
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
            % SETATTRIBUTE sets the specified attribute
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

        function addEventListener(this, event, callback, opts)
            % ADDEVENTLISTENER creates an Event listener in the view that, when
            % triggered, notifies this element and execute the defined callback.
            % To use this method, specifiy:
            % - event: name ("click", "mouseenter", ...)
            % - callback: function executed when the listener is triggered.
            %             Its (single) input is the event coming from the view
            % Options:
            % - event props: properties of the HTML Event that should be passed
            %                to Matlab (["clientX", "clientY"], ...)
            % - useCapture: Trigger the listener on the capturing phase rather
            %               than the bubbling one
            % - stopPropagation: Impede that the event bubbles up
            % - mode: whether the view should debounce or throttle the event
            %         (defaults to "normal")
            % - time: if throttle or debounced, the characteristic time of the
            %         function
            % IMPORTANT: You can only have 1 listener per event. If you change
            % the listener, the view is only updated after a drawnow. This means
            % that the new callback can be executed with the properties from
            % the previous listener. To avoid issues, guard your callback
            % functions from changing event properties (basically, use 
            % "isfield")


            arguments
                this (1,1) weblab.components.pseudo.HTMLElement
                event (1,1) string
                callback (1,1) function_handle
                opts.eventProps string = "";
                opts.stopPropagation (1,1) logical = false;
                opts.useCapture (1,1) logical = false;
                opts.mode (1,1) string ...
                    {mustBeMember(opts.mode, ["normal","debounce","throttle"])}...
                    = "normal";
                opts.time (1,1) double = 0;
            end
            data = struct();
            data.event = event;
            data.options = opts;

            this.Callbacks.(event) = callback;
            this.publish("event_listener", data)
        end

        function removeEventListener(this, event)
            % REMOVEEVENTLISTENER makes the element to stop reacting to the view
            % events
            if isfield(this.Callbacks, event)
                this.Callbacks = rmfield(this.Callbacks, event);
                this.publish("remove_listener", event);
            end
        end

    end


    methods (Access = ?weblab.components.HTMLContainer)
        function handleEvent(this, event, data) 
            % HANDLEEVENT executes the stored callback from a given event and
            % with the specified data
            if isfield(this.Callbacks, event)
                feval(this.Callbacks.(event), data);
            end
        end
    end
end