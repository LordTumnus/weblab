classdef LinearProgress < weblab.internal.FrameComponent & ...
        weblab.components.mixin.Styled
    
    properties (SetObservable, Description = "CanBeStained")
        
        % PROGRESSTYPE: Type of the progressbar. Might be linear or circular
        ProgressType string ...
            {mustBeMember(ProgressType, ["linear", "circular"])} = "linear";

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
        % - pill (pill-shaped corners)
        BorderType string ...
            {mustBeMember(BorderType, ["unset", "pill"])} = "unset";

        % STROKEWIDTH: For circular progressbars, this value specifies the
        % circles line-width, expressed as a percentage of the radius
        StrokeWidth double {mustBeInRange(StrokeWidth, 0, 100)} = 10;
    end
        
end
