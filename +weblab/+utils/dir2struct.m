function root = dir2struct(folder)
% DIR2STRUCT converts a folder into a nested struct() that can be used inside a
% weblab tree component
% Usage:
% f = weblab.utils.dir2struct(pwd);
% t = weblab.components.Tree();
% t.Data = f;


root = struct("name", "root");
root.children = {};

root = rAdd(root, folder);

    function node = rAdd(node, folder)
        % RADD recursively add contents to struct node
        fn = dir(folder);
        for ii = 1:numel(fn)
            if (any(strcmp(fn(ii).name,{'.','..'})))
                continue;
            end
            nn = struct("name",fn(ii).name);
            nn.children = {};
            if (fn(ii).isdir)
                nn = rAdd(nn, fullfile(folder,fn(ii).name));
            end
            node.children{end + 1} = nn ;
        end

    end
end