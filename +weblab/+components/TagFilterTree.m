classdef TagFilterTree < weblab.internal.FrameComponent & ...
                         weblab.internal.Container & ...
                         weblab.components.mixin.Styled

    properties (SetObservable, Description = "CanBeStained")
        % NOTOPERATOR: Text that, if at the beginning of a new tag, will cause
        % to filter the tree excluding the tag value
        NotOperator (1,1) string = "~";
        % NOTOPERATOR: Text that, if at the beginning of a new tag, will cause
        % to filter the tree only for branches containing the tag value
        BranchOperator (1,1) string = ":";
    end

    properties (Dependent)
        % TAGS: Tags of the searchbar element
        Tags (1,:) string
        % DATA: Structure with the information for the tree
        Data
    end

    properties (SetAccess = private)
        % SEARCHBAR: Internal tagbar component 
        Searchbar weblab.components.TagBar 
        % TREE: Internal tree component
        Tree weblab.components.Tree
    end


    methods 
        function this = TagFilterTree()
            % TAGFILTERTREE constructor.

            % Create the internal components (searchbar and tree)
            this.Searchbar = weblab.components.TagBar();
            this.Tree = weblab.components.Tree();
            
            % Publish an event with the identifier of the components
            this.publish(weblab.event.Event("register_searchbar", this.Searchbar.ID));
            this.publish(weblab.event.Event("register_tree", this.Tree.ID));

            % Connect the internal components to this one
            this.addComponent(this.Searchbar);
            this.addComponent(this.Tree);
        end
        
        % Dependent getters
        function tags = get.Tags(this)
            tags = this.Searchbar.Tags;
        end
        function data = get.Data(this)
            data = this.Tree.Data;
        end
        % Dependent setters
        function set.Tags(this, tags)
            this.Searchbar.Tags = tags;
        end
        function set.Data(this, data)
            this.Tree.Data = data;
        end
    end
end

