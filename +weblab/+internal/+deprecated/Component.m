% COMPONENT Abstract class for creating custom HTML/CSS/JS components.
%
% Classes inhertiting from a COMPONENT need to specify a constant property
% "HTMLSOURCE", that will be the HTML file loaded inside the an <iframe> element
% of the uifigure.
%
% Subclasses can send a property to the view (HTML/JS) by marking them as dirty
% through the >> markAsDirty << protected method
% Subclasses can also react to a view event by subscribing to it with the 
% >> subscribe << method. 
%
% See the post in which I discuss this class:
% https://matlabthoughts.com/2022/12/11/creating-an-abstract-component/

classdef Component < matlab.ui.componentcontainer.ComponentContainer

    properties (Abstract, Constant)
        % HTMLSOURCE: Path of the HTML file that will be loaded inside the
        % figures <iframe>
        HTMLSource string
    end

    properties (SetAccess = private)
        % SUBSCRIPTIONS: Map of JS event names to callback functions. Callbacks
        % are executed when the given event is received from the view
        Subscriptions struct = struct();
        % DIRTYPROPERTIES: Properties of the element that need to be sent to the
        % view on the next drawnow event, stores as name/value pairs
        DirtyProperties struct = struct();
    end

    properties (Access = private, Hidden)
        % GRIDLAYOUT: Internal layout manager that forces the iframe to fill all 
        % the area from the ComponentContainer
        GridLayout matlab.ui.container.GridLayout
        % HTMLElement: Matlabs base <iframe> wrapper that loads the HTML source
        % file and allows sharing (sending&receiving) data
        HTMLElement matlab.ui.control.HTML 
    end

    methods
        function this = Component(varargin)
            % COMPONENT constructor. Initializes a custom component by creating
            % an uihtml element whose html source is the one specified in the
            % constant properties

            % Call the superclass constructor (which will also invoke the setup
            % method)
            this@matlab.ui.componentcontainer.ComponentContainer(varargin{:});
        end

        function markAsDirty(this, propertyName)
            % MARKASDIRTY specifies that a given property from the class needs
            % to be updated on the view
            arguments
                this (1,1) weblab.internal.deprecated.Component
                propertyName (1,1) string {mustBeValidVariableName}
            end

            % Store the dirty property as a field of the DirtyProperties struct
            this.DirtyProperties.(propertyName) = this.(propertyName);
        end

        function subscribe(this, eventName, callback)
            % SUBSCRIBE stores a callback function to a given event sent from
            % the view
            arguments
                this (1,1) weblab.internal.deprecated.Component
                eventName (1,1) string {mustBeValidVariableName}
                callback (1,1) function_handle {mustHaveTwoArguments}
            end

            % Store the callback in the "Subscriptions" struct
            this.Subscriptions.(eventName) = callback;
        end
    end


    methods (Access = protected)
        function setup(this)
            % SETUP creates a [1,1] layout inside the container, with no
            % padding; and appends to it the uihtml element in which the HTML
            % source will be loaded.

            this.GridLayout = uigridlayout( ...
                "Parent", this, ...
                "ColumnWidth", {'1x'}, "RowHeight",{'1x'}, "Padding", 0);

            this.HTMLElement = uihtml( ...
                "Parent", this.GridLayout, ...
                "HTMLSource", this.HTMLSource, ...
                "DataChangedFcn", @(~,evt) this.handleJSEvent(evt.Data));
        end

        function update(this)
            % UPDATE is executed on every drawnow (graphics update) event. Will
            % send the dirty properties to the view
            if ~isempty(fieldnames(this.DirtyProperties))
                % Send data if there are any dirty properties
                this.HTMLElement.Data = this.DirtyProperties;
                % After sending, we can re-initialize the dirty properties
                % struct
                this.DirtyProperties = struct();
            end
        end
    end

    methods (Access = private)
        function handleJSEvent(this, event)
            % HANDLEJSEVENT is the method executed whenever data is transferred
            % from the view. If the data contains a field "name" that matches a 
            % subscribed event, the associated callback will be executed
            arguments
                this (1,1) weblab.internal.deprecated.Component
                event (1,1) struct
            end

            % Check that the event name matches a subscription
            if all(isfield(event, ["name","data"])) && ...
               isfield(this.Subscriptions, event.name)
                % Evaluate the function handle with 2 arguments: the
                % component(src) and the event(evt)
                this.Subscriptions.(event.name)(this, event.data);
                % equivalent to 
                % >>feval(this.Subscriptions.(event.name), this, event)
            end
        end
    end

end


function mustHaveTwoArguments(fh)
% MUSTHAVETWOARGUMENTS throws an error if the given function handle does not
% have 2 input parameters
assert(nargin(fh) == 2, "component:subs", ...
    "Callback functions must have exactly two arguments")
end




