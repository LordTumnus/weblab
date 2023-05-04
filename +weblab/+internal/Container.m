% CONTAINER

classdef Container < handle

    properties (SetAccess = private)
        % COMPONENTS: List of components that are placed inside the container
        Components weblab.internal.FrameComponent
    end

    properties (Access = private)
        % COMPONENTDELETELISTENERS: List of listeners triggered when their
        % associated component gets deleted
        ComponentDeleteListeners event.listener
    end

    methods (Access = protected)

        function component = addComponent(this, component)
            % ADDCOMPONENT appends a component to the list of components hold by
            % the container

            assert(~isempty(component.ID)); % [TODO] error message
            % Append the component and add a listener that removes it whenever
            % destroyed
            this.Components(end + 1) = component;
            this.ComponentDeleteListeners(end + 1) = addlistener( ...
                component, ...
                "ObjectBeingDestroyed", ...
                @(src, ~) this.removeComponent(src) ...
            );
            % If the component was holding events, try sending them to the frame
            this.sendEventToView(component.clearEventQueue());
            % Specify the parent of the component to this container, and add it
            % a random name
            component.Container = this;
        end

        function removeComponent(this, component)
            % REMOVECOMPONENT removes the specified component from the list of
            % children from the container

            % Skip if the container is already deleted
            if ~isvalid(this)
                return;
            end

            % Remove the component and the listener associated to it
            cIdx = this.Components == component;
            this.Components(cIdx) = [];
            this.ComponentDeleteListeners(cIdx) = [];

            % Delete the parent container from the component
            component.Container = [];
        end
    end

    methods (Sealed, Access = ?weblab.internal.Container)
        function markAsClean(this)
            % MARKASCLEAN reinitializes the properties of the container and all 
            % of its component children after a graphic update
            this.clearComponent(); %#ok<MCNPN>
            arrayfun(@(x) markAsClean(x), this.Components);
        end
    end

    methods (Access = {?weblab.internal.Component, ...
                       ?weblab.internal.Container})

        function sendEventToView(this, ev)
            % SENDEVENTTOVIEW wraps a child event and passes it to the next
            % container, up until the frame
            if ~isempty(ev)
                this.publish(weblab.event.Event("wb__childevent", ev));
            end
        end

    end

    methods (Access = ?weblab.internal.Frame)

        function c = findComponent(this, componentID)
            % FINDCOMPONENT looks for a descendant whose ID matches the
            % specified one

            c = weblab.internal.FrameComponent.empty();
            % If any child matches, the id, return it
            childIdx = [this.Components.ID] == componentID;
            if any(childIdx)
                c = this.Components(childIdx);
                return;
            end
            % Otherwise, repeat the same operation on the children that are
            % containers until a matching id is found
            containers = this.Components(...
                arrayfun(@(x) isa(x, "weblab.internal.Container"), this.Components));
            for ii = 1:numel(containers)
                c = containers(ii).findComponent(componentID);
                if ~isempty(c)
                    return;
                end
            end
        end
    end
end
