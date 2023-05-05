
classdef KeyFrame < handle
    properties
        Identifier string
        Keys containers.Map
    end


    methods
        function this = KeyFrame(id, varargin)

            this.Identifier = id;
            this.Keys = containers.Map("KeyType","char","ValueType","any");

            this.set(varargin{:})
        end

        function set(this, percentage, rules)
            arguments
                this
            end
            arguments (Repeating)
                percentage string
                rules containers.Map 
            end

            for ii = 1:numel(percentage)
                this.Keys(percentage{ii}) = rules{ii};
            end
        end

        function out = jsonencode(this, varargin)
            out = jsonencode(containers.Map(this), varargin{:});
        end
    end

    methods (Access = private)
        function m = containers.Map(this)
            k = "@keyframes " + [this.Identifier];
            v = {this.Keys};
            m = containers.Map();
            for ii = 1:numel(k)
                m(k(ii)) = v{ii};
            end
        end
    end


end