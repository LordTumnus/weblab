% FRAME


classdef Event < matlab.mixin.Heterogeneous & handle

    properties (Access = public)
        % NAME: A string defining the name of the event. Doesnt need to be a
        % valid variable name
        Name (1,1) string
        % DATA: Information to be transferred with the event. Can be anything
        % that supports encoding into JSON format (through jsonencode)
        Data
    end

    properties (SetAccess = ?weblab.internal.Component)
        % SOURCE: The component publishing the event
        Source
    end

    methods
        function this = Event(name, data)
            % EVENT constructor. Specify the name and the data contained in the
            % event
            if nargin == 0
                return;
            end
            this.Name = name;
            this.Data = data;
        end
    end

    methods (Access = public)
        function out = jsonencode(this, varargin)
            % JSONENCODE converts the event into a struct, that later is 
            % transformed into a valid JS variable
            s = struct();
            s.id = this.Source.ID;
            s.name = this.Name;
            s.data = this.Data;
            out = jsonencode(s, varargin{:});
        end
    end
end