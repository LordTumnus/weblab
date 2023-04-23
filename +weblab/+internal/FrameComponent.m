% FRAMECOMPONENT

classdef FrameComponent < matlab.mixin.Heterogeneous & ...
                     weblab.internal.Component


methods
    function this = FrameComponent()
        % FRAMECOMPONENT constructor

        % Initialize the ID with a random value
        this.ID = weblab.utils.generateID();
    end
end

end
