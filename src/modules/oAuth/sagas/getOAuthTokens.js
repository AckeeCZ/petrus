import { config, globalEnv } from 'Config';

export default function* getOAuthTokens() {
    const {
        validateRedirectUrl,
        parseRedirectUrlParams,
        fetchAccessToken,
        enforceAccessTokenScheme,
        enforceRefreshTokenScheme,
        processTokens,
    } = config.oAuth;

    if (!globalEnv.location || !validateRedirectUrl(config.oAuth, window.location)) {
        return null;
    }

    const searchParams = yield parseRedirectUrlParams(window.location);

    if (!searchParams.accessToken) {
        const result = yield fetchAccessToken(searchParams);

        Object.assign(searchParams, result);
    }

    const accessToken = yield enforceAccessTokenScheme(searchParams);
    const refreshToken = yield enforceRefreshTokenScheme(searchParams);

    const tokens = yield processTokens(accessToken, refreshToken);

    return tokens;
}
