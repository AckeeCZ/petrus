import config from '../config';

// eslint-disable-next-line
export function* getOAuthTokens() {
    const {
        validateRedirectUrl,
        parseRedirectUrl,
        fetchAccessToken,
        enforeAccessTokenScheme,
        enforeRefreshTokenScheme,
    } = config.oAuth;

    if (!validateRedirectUrl(config.oAuth, window.location)) {
        return;
    }

    const searchParams = parseRedirectUrl(window.location);

    if (!searchParams.accessToken) {
        const result = yield fetchAccessToken(searchParams);

        Object.assign(searchParams, result);
    }

    const accessToken = enforeAccessTokenScheme(searchParams);
    const refreshToken = enforeRefreshTokenScheme(searchParams);

    // eslint-disable-next-line
    return {
        accessToken,
        refreshToken,
    };
}
