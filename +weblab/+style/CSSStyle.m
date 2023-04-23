% CSSSTYLE 

classdef CSSStyle < handle

    properties (SetAccess = private)
        % RULES: Set of rules that are applied to the stylable element
        Rules weblab.style.CSSRule
    end

    methods
        function this = CSSStyle()
            % CSSTYLE constructor. Initialize a single rule targeting the
            % base component (no pseudoelements)
            this.Rules = weblab.style.CSSRule("");
        end

    end

    methods (Access = public)
        function tf = hasRule(this, target)
            % HASRULE checks if the style contains a rule matching the target
            % element
            rIdx = [this.Rules.Target] == target;
            tf = any(rIdx);
        end

        function rule = getRule(this, target)
            % GETRULE returns the rule matching the specified selector. If no
            % selector is passed, defaults to the base one
            arguments
                this
                target string = "";
            end
            rule = this.Rules([this.Rules.Target] == target);
        end

        function rule = addRule(this, target)
            % ADDRULE appends a new rule to the style

            % If there is a rule matching the specified selector,  do not create
            % a new rule but return the existing one
            if this.hasRule(target)
                rule = this.getRule(target);
                return;
            end
            % Create the rule
            rule = weblab.style.CSSRule(target);
            this.Rules(end + 1) = rule;
        end

        function out = jsonencode(this, varargin)
            % JSONENCODE converts the style into a string that can be passed
            % down to JS

            map = this.getRule("").Map;
            for ii = 2:numel(this.Rules)
                map(this.Rules(ii).Target) = this.Rules(ii).Map;
            end
            out = jsonencode(map, varargin{:});
        end
    end

end











