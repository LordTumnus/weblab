function snake_case = toSnakeCase(camelCase)
snake_case = regexprep(camelCase,'(.)([A-Z][a-z]+)','$1_$2');
snake_case = lower(regexprep(snake_case,'([a-z0-9])([A-Z])','$1_$2'));
end