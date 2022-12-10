% BUTTON Class that renders an HTML button inside a uifigure. 
% The user can modify:
% - the css style, changing the fields of the Style property
% - the text inside the button, setting the Text property
% The button notifies the following events, to which listener and callbacks can
% be attached:
% - click events
% - mouse enter / mouse leave events
%
% Inherits from the Component class, as described in 
% https://matlabthoughts.com


classdef Button < weblab.internal.deprecated.Component

    properties
        % STYLE: A struct containing valid CSS style attributes in camelCase
        % form (backgroundColor, borderRadius, ...)
        Style struct = struct();
        % TEXT: The text rendered inside the button, specified as a string. Safe
        % against XS
        Text string = "";
        % CLICKFCN, MOUSEENTERFCN, MOUSELEAVEFCN: Callback functions executed
        % when a click, mouseenter or mouseleave event is received from the JS
        % view
        ClickFcn function_handle = @(~, ~) nop();
        MouseEnterFcn function_handle = @(~, ~) nop();
        MouseLeaveFcn function_handle = @(~, ~) nop();
    end
    properties (Constant, Hidden)
        HTMLSource string = fullfile(fileparts(mfilename("fullpath")),"button_component.html");
    end

    methods
        function this = Button(varargin)
            % Superclass
            this@weblab.internal.deprecated.Component(varargin{:});
            % Subscribe to the relevant JS events
            this.initializeSubscriptions();
        end

        function set.Style(this, style)
            % SET.STYLE changes the style of the button
            this.Style = style;
            this.markAsDirty("Style");
        end

        function set.Text(this, text)
            % SET.TEXT changes the text inside the button
            this.Text = text;
            this.markAsDirty("Text");
        end
    end


    methods (Access = protected)
        function initializeSubscriptions(this)
            % INITIALIZESUBSCRIPTIONS subscribes the Button component to the
            % click, mouse enter & mouse leave view events
            this.subscribe("click", @(~, evt) feval(this.ClickFcn, this, evt));
            this.subscribe("mouseEnter", @(~, evt) feval(this.MouseEnterFcn, this, evt));
            this.subscribe("mouseLeave", @(~, evt) feval(this.MouseLeaveFcn, this, evt));
        end
    end

end

function nop()
end
