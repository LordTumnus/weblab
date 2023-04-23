% FRAME

classdef Frame < matlab.ui.componentcontainer.ComponentContainer & ...
                 weblab.internal.Component & ...
                 weblab.internal.DynamicContainer

    properties (SetAccess = private, Hidden)
        % GRIDLAYOUT: Internal layout manager that forces the iframe to fill all 
        % the area from the ComponentContainer
        GridLayout matlab.ui.container.GridLayout
        % HTMLElement: Matlabs base <iframe> wrapper that loads the HTML source
        % file and allows sharing (sending&receiving) data
        HTMLElement matlab.ui.control.HTML 
        % REQUIRESUPDATE: Flag that, when toggled, causes the frame to request 
        % a view update
        RequiresUpdate logical = false;
    end


    properties (Constant, Hidden)
        % HTMLSOURCE: Path of the HTML file that will be loaded inside the
        % figures <iframe>
        HTMLSource string = fullfile(fileparts(mfilename("fullpath")), ...
                      "..", "source", "index.html");
    end


    methods (Access = protected)
        function setup(this)
            % SETUP creates a [1,1] layout inside the div container, with no
            % padding; and appends to it the iframe element in which the HTML
            % source will be loaded

            % Assign the id
            this.ID = "wb__frame";

            this.GridLayout = uigridlayout( ...
                "Parent", this, ...
                "ColumnWidth", {'1x'}, "RowHeight",{'1x'}, "Padding", 0);
            this.HTMLElement = uihtml( ...
                "Parent", this.GridLayout, ...
                "HTMLSource", this.HTMLSource, ...
                "DataChangedFcn", @(~,evt) this.dispatchViewEvent(evt.Data));
        end

        function update(this)
            % UPDATE is executed on every drawnow (graphics update) event, and 
            % it will send the events to the view

            if isempty(this.EventQueue) 
                return;
            end
            % Copy the events into a variable before clearing the properties of
            % the frame
            data = num2cell(this.EventQueue);
            % Clear the events and the dirty properties from the children
            this.RequiresUpdate = false;
            this.EventQueue = weblab.event.Event.empty();
            this.markAsClean();
            % Pass internal events to view
            this.HTMLElement.Data = data;
        end

    end

    methods (Access = {?weblab.internal.Component, ...
                       ?weblab.internal.Container})

        function requestFrameUpdate(this)
            % REQUESTFRAMEUPDATE toggles the frames internal property to true,
            % essentially causing the update method to be triggered on the next
            % possible drawnow event
            this.RequiresUpdate = true;
        end

        function sendEventToView(this, event)
            % SENDEVENTTOVIEW stores the event in the internal events property 
            % of the frame
            n = numel(event);
            this.EventQueue(end+1 : end+n) = event;
            this.RequiresUpdate = true;
        end
    end

    methods (Access = private)
        function dispatchViewEvent(this, viewEvents)
            % DISPATCHVIEWEVENT is the handler executed on every "DataChanged"
            % event triggered from the view. It will look for the node in the
            % frame components tree whose id matches the event source, and let
            % that node handle the event

            for event = viewEvents
                % If the source is the same frame element, handle the event
                if this.ID == event.id
                    this.handleViewEvent(event);
                    return;
                end

                % Find the descendant with the matching source and let it handle the
                % event. If no match, don't do anything
                src = this.findComponent(event.id);
                if ~isempty(src)
                    src.handleViewEvent(event);
                end
            end


        end
    end

end