import { put, takeLeading } from 'redux-saga/effects';

import { config, isPetrusError, PetrusError, PetrusErrorType } from 'config';
import { deleteTokens, setTokens } from 'services/actions';
import { tokensSelector } from 'services/selectors';
import { validateTokens } from 'services/utils';

import { appSelect } from 'services/utils/reduxSaga';
import type { PetrusTokens } from 'types';
import { refreshTokens, RefreshTokensRequestPayload } from '../actions';

export function* refreshTokensTask(currentTokens?: RefreshTokensRequestPayload) {
    const tokens = currentTokens ? currentTokens : yield* appSelect(tokensSelector);

    if (!tokens?.refreshToken) {
        throw new PetrusError(
            PetrusErrorType.UNAVAILABLE_TOKENS,
            `Can't refresh access token without a refresh token. Received 'tokens': ${JSON.stringify(tokens, null, 2)}`,
        );
    }

    const refreshedTokens: PetrusTokens = yield config.handlers.refreshTokens(tokens as Required<PetrusTokens>);

    validateTokens(refreshedTokens);

    return refreshedTokens;
}

export default function* refreshTokensHandler() {
    yield takeLeading(refreshTokens.request, function* (action) {
        try {
            const refreshedTokens = yield* refreshTokensTask(action.payload);

            yield put(setTokens(refreshedTokens));

            yield put(refreshTokens.success());
        } catch (e) {
            if (isPetrusError(e)) {
                config.logger.error(e);
                yield put(refreshTokens.failure(e));
            } else {
                const error = new PetrusError(
                    PetrusErrorType.REFRESH_TOKENS_FAILURE,
                    `Failed to refresh tokens.`,
                    e as Error,
                );
                config.logger.error(error);
                yield put(refreshTokens.failure(error));
            }
            yield put(deleteTokens());
        }
    });
}
