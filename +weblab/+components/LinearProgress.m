classdef LinearProgress < weblab.internal.FrameComponent & ...
        weblab.components.mixin.Styled
    
    properties (SetObservable, Description = "CanBeStained")
        % VALUE: The displayed progress, expressed as a value between 0 and 1.
        % Does not have an effect if Indeterminate is set to true
        Value double {mustBeInRange(Value, 0, 1)} = 0;
        
        % INDETERMINATE: If true, the progressbar moves indefinitely. If false,
        % the Value is displayed
        Indeterminate logical = false;
        
        % SHOWVALUE: Displays the current progressbar value as a percentage
        % "(Value * 100)%". The value is hidden if Indeterminate is true
        ShowValue logical = false;
        
        % BORDERTYPE: Select a border style. Possible values are:
        % - unset (straight corners)
        % - rounded (10% rounded corners)
        % - pill (pill-shaped corners)
        BorderType string ...
            {mustBeMember(BorderType, ["unset", "rounded", "pill"])} = "unset";
    end
        
end
