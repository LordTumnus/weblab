% STATICCONTAINER

classdef StaticContainer < weblab.internal.Container

    methods 
        function this = StaticContainer()
            % STATICCONTAINER constructor

            % Run the getStaticComponents (which should output the list of
            % components already in the view) and publish an event to register
            % them with their IDs in the view
            components = this.getStaticComponents();
            if ~isempty(components)
                this.publish(weblab.event.Event("wb__register_children", ...
                    num2cell([components.ID])));
            end
            
            % Add every component and mark them as ready to publish 
            for component = components
                this.addComponent(component);
            end            
        end
    end
    
    methods (Abstract, Access = protected)
        % GETSTATICCOMPONENTS returns an array of the frame components that are
        % children of this container already when its created 
        c = getStaticComponents(~)
    end
end        