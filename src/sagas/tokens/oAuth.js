import config from '../config';
import { globalEnv } from '../../config';

export function* getOAuthTokens() {
    const {
        validateRedirectUrl,
        parseRedirectUrlParams,
        fetchAccessToken,
        enforceAccessTokenScheme,
        enforceRefreshTokenScheme,
    } = config.oAuth;

    // handle SSR use
    if (!globalEnv.location) {
        return;
    }

    if (!validateRedirectUrl(config.oAuth, window.location)) {
        return;
    }

    const searchParams = parseRedirectUrlParams(window.location);

    if (!searchParams.accessToken) {
        const result = yield fetchAccessToken(searchParams);

        Object.assign(searchParams, result);
    }

    const accessToken = enforceAccessTokenScheme(searchParams);
    const refreshToken = enforceRefreshTokenScheme(searchParams);

    // eslint-disable-next-line
    return {
        accessToken,
        refreshToken,
    };
}
