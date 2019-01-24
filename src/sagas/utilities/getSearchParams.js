function toCapitalize(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function fromSnakeToCamelCase(string) {
    const chunks = string.split('_');

    return chunks.slice(1).reduce((acc, chunk) => `${acc}${toCapitalize(chunk)}`, chunks[0]);
}

function getSearchEntries(string) {
    // split string with '&' -> ['access_token=ABCDExyz123']
    // split each string entry with '=' -> [['access_token', 'ABCDExyz123]]
    // convert key of each entry from snake case to camel case
    return string
        .split('&')
        .map(stringEntry => stringEntry.split('='))
        .map(([key, value]) => [fromSnakeToCamelCase(key), value]);
}

export default function getUrlSearchParams(urlString) {
    const url = new URL(urlString);

    // can't use url.search because the case with hash char (e.g. #access_token=123)
    const search = url.href.replace(url.origin + url.pathname, '');

    const entries = search.charAt(0) === '#' ? getSearchEntries(search.slice(1)) : url.searchParams.entries();

    const searchParams = {};

    for (const [key, value] of entries) {
        searchParams[key] = value;
    }

    return searchParams;
}
