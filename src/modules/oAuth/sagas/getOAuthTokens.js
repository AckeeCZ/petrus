import { config, globalEnv } from 'Config';

export default function* getOAuthTokens() {
    const {
        validateRedirectUrl,
        parseRedirectUrlParams,
        fetchAccessToken,
        enforceAccessTokenScheme,
        enforceRefreshTokenScheme,
    } = config.oAuth;

    // handle SSR use
    if (!globalEnv.location) {
        return {};
    }

    if (!validateRedirectUrl(config.oAuth, window.location)) {
        return {};
    }

    const searchParams = parseRedirectUrlParams(window.location);

    if (!searchParams.accessToken) {
        const result = yield fetchAccessToken(searchParams);

        Object.assign(searchParams, result);
    }

    const accessToken = enforceAccessTokenScheme(searchParams);
    const refreshToken = enforceRefreshTokenScheme(searchParams);

    return {
        accessToken,
        refreshToken,
    };
}
