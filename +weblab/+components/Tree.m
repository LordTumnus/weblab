classdef Tree < weblab.internal.FrameComponent & ...
                  weblab.components.mixin.Styled


    properties (SetObservable, Description = "CanBeStained")
        % DATA: Nested struct that will be displayed as the tree in the view.
        % The Data must follow the follwing structure:
        % - name = 'root'
        % - children = [struct('name': string, 'icon'?: string, 'children':[...])]
        Data struct {mustBeValidData} = struct("name","root","children",[]);

        % HIGHLIGHTONFILTER: Enables or disables highlighting when the <filter>
        % method is called
        HighlightOnFilter (1,1) logical = true;

        % IMAGEMAP: To show an image next to a leaf (not branches), define a map
        % whose entries are the icon names, and whose values are
        % weblab.style.Images. If a leaf in the Data property has an "icon"
        % field and it is an entry of the map, the icon will be used in the view
        % > If an image map contains a "default" element, it will be used for 
        % all nodes whose icon is not found in the map
        ImageMap (1,1) struct {mustBeImageMap}
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
            % EXPANDALL expands all nodes
            arguments
                this (1,1) weblab.components.Tree
            end
            this.publish(weblab.event.Event("expand_all", []));
        end

        function collapseAll(this)
            % COLLAPSEALL collapses all nodes
            arguments
                this (1,1) weblab.components.Tree
            end
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

function mustBeImageMap(m)
% MUSTBEIMAGEMAP checks that the passed input is a struct whose values are CSS
% images
assert(isa(m, "struct") && ...
    all(structfun(@(x) isa(x, "weblab.style.Image"), m)));
end