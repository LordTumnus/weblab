classdef HTMLContainer < weblab.internal.FrameComponent & ...
        weblab.components.mixin.Styled

    properties (SetAccess = private)
        % HTMLCHILDREN: List of controllable HTML elements contained within this
        % element
        HTMLChildren weblab.components.pseudo.HTMLElement
    end


    methods 

        function this = HTMLContainer()
            this.subscribe("internal_event", @(e) this.handleChildEvent(e.source, e.data));
        end

        function elements = appendElement(this, type)
            % APPENDELEMENT appends a new HTML element of the specified type to 
            % this container. The new element must also have a unique id
            arguments
                this (1,1) weblab.components.HTMLContainer
            end
            arguments (Repeating)
                type (1,1) string
            end
            elements = cellfun(@(x) this.createElement(x), ...
                type, 'UniformOutput', true) ;

            % Publish the event to the view
            arrayfun(@(x) ...
                this.publish(weblab.event.Event("insert_html",struct("id",x.ID,"type",x.Type))),...
                elements);
        end
    end


    methods (Access = private)
        function element = createElement(this, type)
            arguments
                this weblab.components.HTMLContainer
                type (1,1) string
            end
            % Create an HTML object wrapper
            element = weblab.components.pseudo.HTMLElement(type);
            element.Container = this;
            this.HTMLChildren(end + 1) = element;
        end

        function handleChildEvent(this, src, data)
            child = this.HTMLChildren([this.HTMLChildren.ID] == src);
            if ~isempty(child) 
                child.handleEvent(data.name, data.data);
            end
        end
    end

end
