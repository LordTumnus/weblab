function [root, iconMap] = dir2struct(folder)
% DIR2STRUCT converts a folder into a nested struct() that can be used inside a
% weblab tree component
% Usage:
% f = weblab.utils.dir2struct(pwd);
% t = weblab.components.Tree();
% t.Data = f;


root = struct("name", "root");
root.children = {};

root = rAdd(root, folder);
iconMap = getIcons();

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
            else
                [~,~,itype] = fileparts(fn(ii).name);
                nn.icon = strrep(itype,".","");
            end
            node.children{end + 1} = nn ;
        end
    end

end


function iconMap = getIcons()
% GETICONS returns a struct mapping file types to a weblab.style.Image
% Icons are located in ../resources/file_icons

iconDir = fullfile(fileparts(mfilename("fullpath")), "..", "resources", "file_icons");
iconFiles = dir(iconDir);
iconNames = strrep(string({iconFiles.name}),".png","");
iconNames(1:2) = [];

iconMap = struct();
for ii = 1:numel(iconNames)
    iconMap.(iconNames(ii)) = weblab.style.Image(fullfile(iconDir, iconNames(ii)+".png"));
end

% Also add a default icon that can be used as a backup when the file doesnt
% match any of the icon types
iconMap.default = weblab.style.Image(fullfile(iconDir,"file.png"));


end


