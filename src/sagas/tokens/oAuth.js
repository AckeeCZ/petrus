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

    const url = window.location.href;

    if (!validateRedirectUrl(url)) {
        return;
    }

    const searchParams = parseRedirectUrl(url);

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
