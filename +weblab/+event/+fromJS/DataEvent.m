classdef DataEvent < event.EventData

    properties 
        Data
    end

    methods
        function this = DataEvent(data)
            this.Data = data;
        end
    end
end