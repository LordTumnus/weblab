classdef TagBar < weblab.internal.FrameComponent & ...
                  weblab.components.mixin.Styled

    properties (SetObservable, Description = "CanBeStained")

        % TAGS: List of tags inside the search bar
        Tags (1,:) string = string.empty();

        % PLACEHOLDER: Placeholder text 
        Placeholder (1,1) string = "Search";

        % DELIMITERS: List of characters or strings that will cause tags to be
        % splitted
        Delimiters string = " ";

        % BACKSPACE: Specify the behaviour that occurs when the user presses the
        % backspace key
        %  - true: delete last tag
        %  - false: do nothing (delete tags pressing the x button)
        %  - "edit": edit last tag
        Backspace (1,1) {mustBeValidBackspace} = true;

        % DUPLICATES: Enable or disable having duplicate tags on the search bar
        Duplicates (1,1) logical = true;

        % EDITTAGS: Enable or disable double clicking on a tag to edit it
        EditTags (1,1) logical = true;

        % VALIDATIONPATTERN: Regular expression that new tags must match to be 
        % inserted in the search bar
        ValidationPattern (1,1) string = "";

        % BLACKLIST: List of blacklisted tag values
        Blacklist string = "";

        % WHITELIST: Valid and enforced tag values
        Whitelist string = "";
    end

    events (Description = "HasCallbackProperty")
        % TAGSCHANGED: Tags have beem added or deleted
        TagsChanged
        % FOCUS: Component gained focus
        Focus 
        % BLUR: Component lost focus
        Blur
    end


    methods (Access = public)

        function this = TagBar()
            % TAGBAR constructor
            % Change silently the Tags property when tags have changed
            addlistener(this, "TagsChanged", @(~, evt) ...
                this.changePropertiesWithoutNotifyingView("Tags", evt.Data));
        end

        function clearTags(this)
            % CLEARTAGS removes all tags from the view
            evt = weblab.event.Event("clear_tags", []);
            this.publish(evt)
        end
    end

end


function mustBeValidBackspace(prop)
% MUSTBRVALIDBACKSPACE asserts that the backspace property is either true false 
% or "edit" 
assert(islogical(prop) || strcmp(prop, "edit") );
end