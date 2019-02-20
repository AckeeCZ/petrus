import getSearchParams from './utilities/getSearchParams';
import createExpirationDate from './utilities/createExpirationDate';

const oAuth = {
    enabled: false,
    origin: '',
    redirectPathname: '/oauth/redirect',
    validateRedirectUrl(oAuthConfig, location) {
        return location.origin === oAuthConfig.origin && location.pathname === oAuthConfig.redirectPathname;
    },
    parseRedirectUrlParams: getSearchParams,
    fetchAccessToken() {},
    enforceAccessTokenScheme(searchParams) {
        const { accessToken, expiresIn, ...rest } = searchParams;

        return {
            ...rest,
            token: accessToken,
            expiration: createExpirationDate(expiresIn),
        };
    },
    enforceRefreshTokenScheme(searchParams) {
        const { refreshToken } = searchParams;

        return {
            token: refreshToken,
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
