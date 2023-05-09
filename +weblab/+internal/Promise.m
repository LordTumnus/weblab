classdef Promise < handle

    properties
        % VALUE: The value to which the promise resolves. Can be anything
        Value % any
    end

    properties (SetAccess = private)
        % FULLFILLED: Boolean indicating if the promise has been resolved. Note
        % that, if the promise gets resolved to a second promise, the original
        % wont be fullfilled until the second does
        Fullfilled (1,1) logical = false;
        % CALLBACK: Function that resolves a promise if it was created through a 
        % THEN method
        Callback (1,1) function_handle = @(~) nop();
        % ID: A unique identifier to track this promise
        ID (1,1) string
    end


    events (ListenAccess = ?weblab.internal.Promise)
        % PROMISEFULLFILLED: Event triggered when the promise gets resolved into
        % a non-promise value
        PromiseFullfilled
    end

    methods 

        function this = Promise()
            % PROMISE constructor. Adds a random id to the promise
            this.ID = weblab.utils.generateID();
        end
        function tf = isResolved(this)
            % ISRESOLVED returns a boolean indicating if the promise has been
            % fullfilled
            tf = this.Fullfilled;
        end

        function v = get(this)
            % GET returns the value of the promise. This method should only be
            % used after the promise gets fullfilled.
            v = this.Value;
        end

        function resolve(this, value)
            % RESOLVE resolves the promise with the specified value.

            arguments
                this (1,1) weblab.internal.Promise
                value % any
            end
            
            % If the resolution value is a new promise, then this one is not
            % considered to have resolved until the new onw does.
            if isa(value, "weblab.internal.Promise")
                addlistener(value, "PromiseFullfilled", ...
                    @(~,~) this.resolve(value.Value));
                return;
            end
            % If the value is anything but a promise, mark this promise as
            % fullfilled, store the value and notify listeners
            this.Fullfilled = true;
            this.Value = value;
            this.notify("PromiseFullfilled");

        end
        function other = then(this, callback)
            % THEN creates a new promise that gets resolved right after this
            % one is fullfilled. The new promise will get resolved by calling
            % the callback function with the originals promise value as an input
            % argument
            arguments 
                this (1,1) weblab.internal.Promise
                callback (1,1) function_handle = @(~) this.get();
            end

            % Create the output promise
            other = weblab.internal.Promise();
            % Attach a listener that resolves "other" when this promise gets
            % fullfilled
            addlistener(this, "PromiseFullfilled", ...
                @(~,~) other.resolve(evaluateCallback(callback, this.Value)));
        end

        function this = wait(this, max_time, interval)
            % WAIT blocks matlabs thread until the promise gets fullfilled
            % Returns the promise so that it can be chained
            arguments 
                this
                max_time = 1
                interval = .05;
            end

            % Force a graphics update
            drawnow;
            time = 0;
            % Pause matlabs execution until the promise has been fullfilled 
            while ~this.Fullfilled && time < max_time
                time = time + interval;
                pause(interval);
            end
        end
    end

    methods (Static)
        function this = all(promises)
            % ALL returns a new promise that is fullfilled ONLY after all inputs
            % promises have been resolved. The value to which the resulting
            % promise resolves to is a cell array of the results of the others
            arguments (Repeating)
                promises (1,1) weblab.internal.Promise
            end
            promises = [promises{:}];
            this = weblab.internal.Promise();
            arrayfun(@(x) addlistener(x, "PromiseFullfilled", ...
                @(~, ~) checkAll()), promises);
            function checkAll()
                if all([promises.Fullfilled])
                    this.resolve({promises.Value});
                end
            end
        end
    end

end

function nop()
end

function out = evaluateCallback(cb, value)
nOut = nargout(cb);
if nOut >= 1
    out = feval(cb, value);
else
    feval(cb, value);
    out = [];
end
end
