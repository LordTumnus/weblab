classdef Logger < weblab.internal.FrameComponent

    methods
        function this = Logger()
            this.ID = "wb__logger";
            this.subscribe("wb__log", @(evt) this.log(evt));
        end
    end

    methods (Access = private)
        function log(~, evt)
            disp(evt.Data);
        end
    end
end