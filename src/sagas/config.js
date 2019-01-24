import getSearchParams from './utilities/getSearchParams';

const oAuth = {
    enabled: false,
    origin: '',
    redirectPathname: '/oauth/redirect',
    validateRedirectUrl(oAuthConfig, location) {
        return location.origin === oAuthConfig.origin && location.pathname === oAuthConfig.redirectPathname;
    },
    parseRedirectUrl: getSearchParams,
    fetchAccessToken() {},
    enforeAccessTokenScheme(searchParams) {
        const { accessToken, expiresIn, ...rest } = searchParams;

        return {
            ...rest,
            token: accessToken,
            expiration: expiresIn,
        };
    },
    enforeRefreshTokenScheme(searchParams) {
        const { refreshToken } = searchParams;

        return {
            refreshToken,
        };
    },
};

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

    oAuth,
};

export default config;
