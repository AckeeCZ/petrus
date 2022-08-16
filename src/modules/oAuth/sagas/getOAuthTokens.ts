import { config, isPetrusError, PetrusError, PetrusErrorType } from 'config';
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
        if (isPetrusError(e)) {
            config.logger.error(e);
        } else {
            config.logger.error(
                new PetrusError(PetrusErrorType.GET_OAUTH_TOKENS_FAILURE, `Failed to get oAuth tokens.`, e as Error),
            );
        }
        return null;
    }
}
