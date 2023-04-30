% STYLED
classdef Styled < handle

    properties (SetObservable, Description = "CanBeStained", ...
                SetAccess = public, Hidden)
        % STYLE: Hidden style object that holds the css attributes of the target
        % component and any pseudo selected ones
        CSSStyle weblab.style.CSSStyle
    end

    methods 
        function this = Styled()
            % STYLABLE constructor. Initialize the style
            this.changePropertiesWithoutNotifyingView(...
                "CSSStyle", weblab.style.CSSStyle()); %#ok<MCNPN> 
        end


        function style(this, name, value)
            % STYLE sets css attributes to the component (the target is
            % specified in the view)
            arguments
                this
            end
            arguments (Repeating)
                name weblab.style.CSSProperties
                value string
            end
            rule = this.CSSStyle.getRule("");
            cellfun(@(x,y) rule.set(x,y), name, value);
            % [REQUIRED]: Re-assign the style property so that it triggers a
            % post-set event
            this.CSSStyle = this.CSSStyle;
        end

        function pstyle(this, tgt, name, value)
            % PSTYLE sets css attributes to a pseudo element of the component.
            % For example, 
            % >> c.pstyle("&:hover", ...) targets the hover selector of the
            % component
            % >> c.pstyle("& li", ...) targets the "li" descendants of the
            % component
            arguments
                this
                tgt (1,1) string
            end
            arguments (Repeating)
                name weblab.style.CSSProperties
                value string
            end

            rule = this.CSSStyle.addRule(tgt);
            cellfun(@(x,y) rule.set(x,y), name, value);
            % [REQUIRED]: Re-assign the style property so that it triggers a
            % post-set event
            this.CSSStyle = this.CSSStyle;
        end


        function cssvar(this, tgt, name, value) 
            % CSSVAR sets css properties (vars) to a pseudo element
            % >> c.cssvar("& .my_class", "--color", "red");
            % >> c.pstyle("& .my_class", "backgroundColor", "var(--color)")
            arguments
                this
                tgt (1,1) string
            end
            arguments (Repeating)
                name string {mustBeCSSVar}
                value string
            end

            rule = this.CSSStyle.addRule(tgt);
            cellfun(@(x,y) rule.set(x,y), name, value);
            % [REQUIRED]: Re-assign the style property so that it triggers a
            % post-set event
            this.CSSStyle = this.CSSStyle;
        end
    end
end

function mustBeCSSVar(name)
    assert(startsWith(name, "--"));
end
