classdef (Abstract) PseudoComponent < handle

    properties 
        Container weblab.internal.FrameComponent
    end

    properties
        ID (1,1) string
    end

    methods 
        function this = PseudoComponent()
            % PSEUDOCOMPONENT constructor
            this.ID = weblab.utils.generateID();
        end
    end
    methods (Access = public)
        function publish(this, name, data)
            % PUBLISH republishes an event through the pseudo components
            % container

            % Wrap the data in a structure that contains the pseudo element id
            tData = struct();
            tData.source = this.ID;
            tData.pdata = data;
            % Publish the event through the container
            ev = weblab.event.Event(name, tData);
            this.Container.publish(ev)
        end
    end
end