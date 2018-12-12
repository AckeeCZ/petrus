const config = {
    // key for a local storage
    tokensKey: 'tokens',

    remoteLogin: null,
    remoteRefreshTokens: null,
    remoteGetAuthUser: null,

    options: {
        reducerKey: 'auth',
        tokens: {},
    },
};

export default config;
