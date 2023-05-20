classdef HTMLContainer < weblab.internal.FrameComponent & ...
        weblab.internal.DynamicContainer & ...
        weblab.components.mixin.Styled

    properties (SetAccess = private)
        % HTMLCHILDREN: List of controllable HTML elements contained within this
        % element
        HTMLChildren weblab.components.pseudo.HTMLElement
    end


    methods 

        function this = HTMLContainer()
            % HTMLCONTAINER constructor

            this.subscribe("internal_event", ...
                @(e) this.handleChildEvent(e.source, e.data));
        end

        function element = appendElement(this, type, namespace)
            % APPENDELEMENT appends a new HTML element of the specified type to 
            % this container. The new element must also have a unique id
            arguments
                this (1,1) weblab.components.HTMLContainer
                type (1,1) string
                namespace (1,1) string = "http://www.w3.org/1999/xhtml";
            end
            element = this.createElement(type, namespace);

            % Publish the event to the view
            ev = weblab.event.Event("insert_html",...
                struct("id",element.ID,"type",element.Type, "ns", element.Namespace));
            this.publish(ev);
        end
    end


    methods (Access = {?weblab.components.HTMLContainer, ...
                       ?weblab.components.pseudo.HTMLElement})
        function element = createElement(this, type, namespace)
            % CREATELEMENT creates a new object from the HTMLElement pseudo
            % component class
            element = weblab.components.pseudo.HTMLElement(type, namespace);
            element.Container = this;
            this.HTMLChildren(end + 1) = element;
        end

        function deleteElement(this, element)
            % DELETEELEMENT removes an HTML element inside the container (and
            % all its descendants)
            arguments
                this (1,1) weblab.components.HTMLContainer
                element (1,1) weblab.components.pseudo.HTMLElement
            end
            if ~isvalid(this)
                return
            end
            idx = this.HTMLChildren == element;
            if any(idx)
                ev = weblab.event.Event("remove_html", element.ID);
                this.publish(ev);
                this.HTMLChildren(idx) = [];
            end
        end
    end

    methods (Access = private)
        function handleChildEvent(this, src, data)
            % HANDLECHILDEVENT is the callback executed whenever a child element
            % listener is triggered in the view
            child = this.HTMLChildren([this.HTMLChildren.ID] == src);
            if ~isempty(child) 
                child.handleEvent(data.name, data.data);
            end
        end
    end

end
