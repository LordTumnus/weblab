
classdef DirtyPropertyEvent < weblab.event.Event

    methods
        function this = DirtyPropertyEvent(propertyName, propertyValue)
            data = struct();
            data.name = propertyName;
            data.value = propertyValue;
            this@weblab.event.Event("wb__dirty_prop", data);
        end
    end

    methods 
        function setPropertyValue(this, newValue)
            this.Data.value = newValue;
        end
    end
end