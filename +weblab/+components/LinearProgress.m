classdef LinearProgress < weblab.internal.FrameComponent & ...
                  weblab.components.mixin.Styled

    properties (SetObservable, Description = "CanBeStained")
        Value
        Indeterminate
        ShowValue
        BorderStyle
    end


    methods (Access = public)

        function this = LinearProgress()
            % LINEARPROGRESS constructor
        end

    end

end
