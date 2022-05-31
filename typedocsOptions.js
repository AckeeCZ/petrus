module.exports = {
    entryPoints: ['./src/index.ts'],
    out: 'docs/api',
    hideGenerator: true,
    includeVersion: true,
    plugin: ['typedoc-plugin-markdown'],
    readme: 'none',
};
