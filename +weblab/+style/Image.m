classdef Image < handle


    properties (SetAccess = private)
        % FILEPATH: Relative or full path of the image
        FilePath (1,1) string
        % FILETYPE: Image type
        FileType (1,1) string {mustBeMember(FileType, ...
            ["jpg", "png", "gif", "webp", "svg", "ico", "bmp"])} = "png";
    end

    methods 
        function this = Image(filePath)
            % IMAGE constructor
            arguments
                filePath (1,1) string;
            end
            this.FilePath = filePath;
            [~,~,fileType] = fileparts(filePath);
            this.FileType = strrep(fileType, ".", "");
        end

        function str = string(this)
            % STRING converts the image into a string that can be used as a css
            % attribute by encoding it into base64 and using wrapping the result
            % in a url() function
            % From the
            % [docs](https://developer.mozilla.org/en-US/docs/Web/CSS/url)
            % > The url() function can be included as a value for background, 
            % background-image, border, border-image, border-image-source, 
            % content, cursor, filter, list-style, list-style-image, mask,
            % mask-image, offset-path, src as part of a @font-face block, and 
            % @counter-style/symbol

            b64 = this.tobase64();
            str = "url(" + b64 + ")"; 
        end

        function str = tobase64(this)
            % TOBASE64 converts the image into a base64 string

            % Read the bytes from the icon file
            fid = fopen(this.FilePath, 'r');
            bytes = fread(fid, 'uint8=>uint8');
            fclose(fid);
            % Encode the bytes into base64 format
            str = sprintf('data:image/%s;base64,%s', ...
                this.FileType, matlab.net.base64encode(bytes));
        end
            
        function out = jsonencode(this, varargin)
            % JSONENCODE encodes the file as a base64 string
            out = jsonencode(string(this), varargin{:});
        end
    end
end