classdef Tree < weblab.internal.FrameComponent & ...
                  weblab.components.mixin.Styled


    properties (SetObservable, Description = "CanBeStained")
        % DATA: Nested struct that will be displayed as the tree in the view.
        % The Data must follow the follwing structure:
        % - name = 'root'
        % - children = [struct('name': string, 'children':[...])] 
        Data struct {mustBeValidData} = struct("name","root","children",[]);

        % HIGHLIGHTONFILTER: Enables or disables highlighting when the <filter>
        % method is called
        HighlightOnFilter (1,1) logical = true;
    end


    methods 
        function filter(this, value, type)
            % FILTER renders the tree but filtering the nodes by the specified
            % parameters. 
            arguments
                this (1,1) weblab.components.Tree
            end
            arguments (Repeating)
                value (1,1) string
                type (1,1) string ...
                    {mustBeMember(type, {'branch','leaf','~branch','~leaf'})}
            end
            tags = cellfun(@(x,y) struct("value", x, "type", y), ...
                value, type, 'UniformOutput', false);
            this.publish(weblab.event.Event("apply_filter", tags));
        end

        function expandAll(this)
            this.publish(weblab.event.Event("expand_all", []));
        end

        function collapseAll(this)
            this.publish(weblab.event.Event("collapse_all", []));
        end
    end
end

function mustBeValidData(d)
% MUSTBEVALIDDATA checks that the input value is a struct with the expected
% format
assert(isa(d, 'struct') && ...
       isfield(d,"name") && ...
       strcmp(d.name, "root") && ...
       isfield(d, "children"));
end