% COMPONENT

classdef (Abstract) Component < handle & dynamicprops

    properties (SetAccess = private)
        % SUBSCRIPTIONS: Map of JS event names to callback functions. Callbacks
        % are executed when the given event is received from the view
        Subscriptions containers.Map
        % DIRTYPROPERTIES: Map between the property names of the component and
        % the associated events
        DirtyProperties containers.Map
        % DIRTYPROPLISTENERS: List of stainable property listeners
        DirtyPropListeners event.listener
    end

    properties (SetAccess = protected)
        % ID: Unique identifier for the component
        ID (1,1) string;
    end

    properties (SetAccess = {?weblab.internal.Container})
        % CONTAINER: The (single) element holding the component
        Container weblab.internal.Container {mustBeScalarOrEmpty}
    end

    properties (Access = protected)
        % EVENTQUEUE: List of events that are not be published until the
        % component is attached to a frame
        EventQueue weblab.event.Event

        % UNFULLFILLEDPROMISES: List of promises that have yet to be fullfilled
        UnfullfilledPromises weblab.internal.Promise
    end


    methods
        function this = Component()
            % COMPONENT constructor

            % Default-initialize the subscriptions and property maps
            if isempty(this.DirtyProperties) || this.DirtyProperties.Count == 0
                this.DirtyProperties = containers.Map();
            end
            if isempty(this.Subscriptions) || this.Subscriptions.Count == 0
                this.Subscriptions = containers.Map();
            end

            mc = meta.class.fromName(class(this));
            % Get all the properties that will cause a view change when they are
            % modified. These need to be:
            % - set observable [SetObservable = true]
            % - stainable [Description = "Stainable]
            props = mc.PropertyList;
            mask = all([[props.SetObservable]; ...
                             strcmp({props.Description}, "CanBeStained")]);
            stainable = props(mask);
            this.DirtyPropListeners = event.listener.empty(0, numel(stainable));
            for ii = 1:numel(stainable)
                this.DirtyPropListeners(ii) = ... 
                    addlistener(this, stainable(ii).Name, 'PostSet', ...
                                @(src,~) this.markAsDirty(src.Name));
            end
            % Get all the events that will be notified in Matlab whenever the 
            % view publishes them. Add a property to the component (event+Fcn)
            % that is also executed before the notification
            events = mc.EventList;
            mask = strcmp({events.Description}, "HasCallbackProperty");
            cbEvents = events(mask);
            for evt = string({cbEvents.Name})
                p = this.addprop(evt + "Fcn");
                p.SetMethod = this.setCallbackMethod(p.Name);
                this.(p.Name) = @(~,~) nop();
                this.subscribe(weblab.utils.toSnakeCase(evt), ...
                    @(data) this.linkEventToProperty(p.Name, evt, data));
            end

            % Subscribe to fetching events
            this.subscribe("wb__fetch", ...
                @(data) this.resolvePromise(data.id, data.value));
        end
    end

    methods (Access = public)
        
        function publish(this, event)
            % PUBLISH dispatches an event through the parent container to the 
            % view. The view component must be subscribed to the event name to
            % handle it

            arguments
                this weblab.internal.Component
                event (1,1) weblab.event.Event
            end
            % Set the component as the source of the event (ID is relevant)
            event.Source = this;

            % If the component is not attached to a container, store the event
            % in a temporal array. See Container.addComponent and 
            % Component.clearEventQueue to see how the queue is re-published
            % when a container is attached
            if isempty(this.Container)
                this.EventQueue(end+1 : end+numel(event)) = event;
                return;
            end
            % Send the event through the container
            this.Container.sendEventToView(event);
        end

        function subscribe(this, eventName, callback)
            % SUBSCRIBE stores a callback function to a given event sent from
            % the view
            arguments
                this weblab.internal.Component
                eventName (1,1) string
                callback (1,1) function_handle {mustHaveNArguments(callback, 1)}
            end
            % Store the callback in the "Subscriptions" struct
            this.Subscriptions(eventName) = callback;
        end

        function unsubscribe(this, eventName)
            % UNSUBSCRIBE stops triggering a callback on a given view event
            arguments
                this weblab.internal.Component
                eventName (1,1) string
            end
            % Remove the event entry from the subscriptions
            this.Subscriptions.remove(eventName);
        end

        function promise = fetch(this, name)
            % FETCH queries a property from the view and returns a promise that
            % will be fullfilled when the view sends its value to matlab
            arguments 
                this weblab.internal.Component
                name (1,1) string
            end
            % Create the promise and add it to the unfullfilled list
            promise = weblab.internal.Promise();
            this.UnfullfilledPromises(end + 1) = promise;
            % Send an event to the view with the property name and the
            % identifier of the promise
            data = struct("name", name, "id", promise.ID);
            this.publish(weblab.event.Event("wb__fetch", data));
        end
    end

    methods (Hidden)
        function changePropertiesWithoutNotifyingView(this, prop, value)
            % CHANGEPROPERTIESWITHOUTNOTIFYINGVIEW will update the matlab
            % component properties without marking them as dirty for the view
            arguments
                this (1,1) weblab.internal.Component
            end
            arguments (Repeating)
                prop string 
                value
            end
            mprop = [this.DirtyPropListeners.Source];
            mprop = [mprop{:}];
            % Disable the listeners before setting the properties
            for ii = 1:numel(prop)
                lIdx = strcmp({mprop.Name}, prop{ii});
                this.DirtyPropListeners(lIdx).Enabled = false;
                this.(prop{ii}) = value{ii};
                this.DirtyPropListeners(lIdx).Enabled = true;
            end
        end
    end


    methods (Access = {?weblab.internal.Component, ...
                       ?weblab.internal.Container})

        function clearComponent(this)
            % CLEARCOMPONENT reinitializes the map containing the dirty
            % properties of the component. This method must be executed inside
            % the clear methods
            this.DirtyProperties = containers.Map();
        end

        function requestFrameUpdate(this)
            % REQUESTFRAMEUPDATE sends a request up the container chain. When
            % arriving to the frame, it will cause a property change that will
            % request an update
            if ~isempty(this.Container)
                this.Container.requestFrameUpdate();
            end
        end


        function queue = clearEventQueue(this)
            % CLEAREVENTQUEUE pops and clears the list of events that were being
            % hold in the component
            queue = this.EventQueue;
            this.EventQueue = weblab.event.Event.empty();
        end
    end
    
    methods (Access = ?weblab.internal.Frame)
        function handleViewEvent(this, evt)
            % HANDLEVIEWEVENT executes the callback function associated
            % with an event
            if this.Subscriptions.isKey(evt.name)
                % Evaluate the function handle with the event as an argument
                s = this.Subscriptions(evt.name);
                s(evt.data);
            end
        end    
    end

    methods (Access = ?weblab.internal.Container)
        function markAsClean(this)
            % MARKASCLEAN marks the component as clean after a frame update
            this.clearComponent();
        end
    end

    methods (Access = private)

        function markAsDirty(this, name)
            % MARKASDIRTY specifies that a given property from the class needs
            % to be updated on the view

            % Convert the property name to snake_case
            sn_name = weblab.utils.toSnakeCase(name);
            % Get the value of the property that has been modified
            value = this.(name);

            % If the property has already been marked dirty, replace the event
            % associated to that property with its newest value
            if this.DirtyProperties.isKey(name)
                propEvt = this.DirtyProperties(name);
                propEvt.setPropertyValue(value);
                this.requestFrameUpdate();
                return;
            end

            % Create a new "DirtyPropertyEvent" associated to the property that
            % has been marked dirty, and publish it to the frame
            evt = weblab.event.DirtyPropertyEvent(sn_name, value);
            this.publish(evt); % This may throw an error
            this.DirtyProperties(name) = evt;
        end

        function f = setCallbackMethod(~, prop)
            % SETCALLBACKMETHOD returns the function executed when an event 
            % dynamic property is triggered
            function setProp(this, value)
                mustHaveNArguments(value, 2);
                this.(prop) = value;
            end
            f = @setProp;
        end

        function linkEventToProperty(this, property, event, data)
            % LINKEVENTTOPROPERTY is the subscription callback for "Viewed"
            % events. Executes the event function and notifies of the event

            % ~ The data coming from the view is wrapped in a Matlab
            % event.EventData
            wrappedData = weblab.event.fromJS.DataEvent(data);

            % Notify the event was triggered
            this.notify(event, wrappedData);

            % Evaluate the linked function
            feval(this.(property), this, wrappedData)
        end

        function resolvePromise(this, id, value)
            % RESOLVEPROMISE resolves the stored promise with the matching ID
            % to the specified value
            idx = [this.UnfullfilledPromises.ID] == id;
            this.UnfullfilledPromises(idx).resolve(value);
            this.UnfullfilledPromises(idx) = [];
        end
    end

end

function mustHaveNArguments(fh, n)
% MUSTHAVETWOARGUMENTS throws an error if the given function handle does not
% have 2 input parameters
assert(nargin(fh) == n, "component:subs", ...
    "Callback functions must have exactly one argument")
end

function nop()
% Does nothing
end
