classdef LinearProgress < weblab.internal.FrameComponent & ...
                  weblab.components.mixin.Styled

    properties (SetObservable, Description = "CanBeStained")
        ProgressType
        Value
        Indeterminate
        ShowValue
        BorderStyle
    end


    methods (Access = public)

        function this = LinearProgress()
            % LINEARPROGRESS constructor
            
            % Force-set the type of the progressbar 
            this.ProgressType = "linear";
        end

    end

end
