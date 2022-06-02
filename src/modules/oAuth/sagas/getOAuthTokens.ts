import { config } from 'config';
import type { PetrusOAuth, PetrusTokens } from 'types';

function* getOAuthTokens() {
    const {
        validateRedirectUrl,
        parseRedirectUrlParams,
        fetchAccessToken,
        enforceAccessTokenScheme,
        enforceRefreshTokenScheme,
        processTokens,
    } = config.oAuth;

    if (!globalThis.location || !validateRedirectUrl(config.oAuth, window.location)) {
        return null;
    }

    const searchParams: PetrusOAuth['searchParams'] = yield parseRedirectUrlParams(window.location);

    if (!searchParams.accessToken) {
        const result: PetrusOAuth['searchParams'] = yield fetchAccessToken(searchParams);

        Object.assign(searchParams, result);
    }

    const accessToken: PetrusTokens['accessToken'] = yield enforceAccessTokenScheme(searchParams);
    const refreshToken: PetrusTokens['refreshToken'] = yield enforceRefreshTokenScheme(searchParams);

    const tokens: PetrusTokens = yield processTokens(accessToken, refreshToken);

    return tokens;
}

export function* getMaybeOAuthTokens() {
    try {
        return yield* getOAuthTokens();
    } catch (e) {
        config.logger.error(e);
        return null;
    }
}
