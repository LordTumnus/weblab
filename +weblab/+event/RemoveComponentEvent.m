
classdef RemoveComponentEvent < weblab.event.Event

    methods
        function this = RemoveComponentEvent(id)
            this.Name = "RemoveComponent";
            this.Data = struct("ID", id);
        end
    end

end