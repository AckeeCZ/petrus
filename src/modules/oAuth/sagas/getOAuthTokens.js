import { config, globalEnv } from 'Config';

export default function* getOAuthTokens() {
    const {
        validateRedirectUrl,
        parseRedirectUrlParams,
        fetchAccessToken,
        enforceAccessTokenScheme,
        enforceRefreshTokenScheme,
    } = config.oAuth;

    if (!globalEnv.location || !validateRedirectUrl(config.oAuth, window.location)) {
        return null;
    }

    const searchParams = parseRedirectUrlParams(window.location);

    if (!searchParams.accessToken) {
        const result = yield fetchAccessToken(searchParams);

        Object.assign(searchParams, result);
    }

    const accessToken = enforceAccessTokenScheme(searchParams);
    const refreshToken = enforceRefreshTokenScheme(searchParams);

    if (!accessToken) {
        return null;
    }

    return {
        accessToken,
        refreshToken,
    };
}
