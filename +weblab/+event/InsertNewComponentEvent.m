
classdef InsertNewComponentEvent < weblab.event.Event

    methods
        function this = InsertNewComponentEvent(type, id)
            this.Name = "wb__insert";
            this.Data = struct("class", type, "id", id);
        end
    end

end