% CSSRULE


classdef CSSRule < handle
                   

    properties (SetAccess = private)
        % TARGET: The selector that will target the element in the view
        Target string
        % MAP: CSS property/value mapping
        Map containers.Map
    end

    methods 
        function this = CSSRule(target)
            % CSSRULE constructor
            this.Target = target;
            this.Map = containers.Map("KeyType","char","ValueType","any");
        end

        function set(this, prop, value)
            % SET assigns values to the specified properties
            arguments
                this
                prop string
                value string
            end
            if value == "" && this.Map.isKey(prop)
                this.Map.remove(prop);
            elseif value ~= ""
                this.Map(prop) = value;
            end
        end
    end
end