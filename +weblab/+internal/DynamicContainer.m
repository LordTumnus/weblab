% DYNAMICCONTAINER

classdef DynamicContainer < weblab.internal.Container

    properties (Access = private)
        % DYNAMICCOMPONENTS: List of components added to the container through
        % the "insert" method
        DynamicComponents weblab.internal.FrameComponent
    end

    methods (Access = public)

        function insert(this, component)
            % INSERT dynamically appends a new component to the container

            % Publish the event that requests the view to create an instance of
            % the component
            evt = weblab.event.InsertNewComponentEvent(...
                class(component), component.ID);
            this.publish(evt);
            % Add the component to the children of the container. This must be
            % done <b>after</b> publishing the insert event
            this.addComponent(component);
            this.DynamicComponents(end + 1) = component;
        end
    end

    methods (Access = protected)
        function removeComponent(this, component)
            % REMOVECOMPONENT removes the specified component from the list of
            % children of the container

            % Skip if the container is already deleted
            if ~isvalid(this)
                return;
            end
            
            % Publish an event to remove the component with the matching id
            dIdx = component.ID == [this.DynamicComponents.ID];
            if any(dIdx)
                evt = weblab.event.RemoveComponentEvent(component.ID);
                this.publish(evt);
                this.DynamicComponents(dIdx) = [];
            end
            removeComponent@weblab.internal.Container(this, component);
        end
    end

end