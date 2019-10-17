const fromSnakeToCamelCase = (src = '') => {
    const chunks = src.split('_');

    const part1 = chunks.slice(0, 1);
    const part2 = chunks.slice(1).reduce((result, chunk) => {
        if (!chunk.length) {
            return result;
        }
        return result + chunk[0].toUpperCase() + chunk.slice(1);
    }, '');

    return `${part1}${part2}`;
};

function getSearchEntries(string) {
    // split string with '&' -> ['access_token=ABCDExyz123']
    // split each string entry with '=' -> [['access_token', 'ABCDExyz123]]
    // convert key of each entry from snake case to camel case
    return string
        .split('&')
        .map(stringEntry => stringEntry.split('='))
        .map(([key, value]) => [fromSnakeToCamelCase(key), value]);
}

export default function getUrlSearchParams(location) {
    // can't use url.search because the case with hash char (e.g. #access_token=123)
    const search = location.href.replace(location.origin + location.pathname, '');

    let entries = [];

    if (search.charAt(0) === '#') {
        entries = getSearchEntries(search.slice(1));
    } else {
        const url = new URL(location.href);
        entries = url.searchParams.entries();
    }

    const searchParams = {};

    for (const [key, value] of entries) {
        searchParams[key] = value;
    }

    return searchParams;
}
