import { put, takeLeading } from 'redux-saga/effects';

import { config, PetrusError } from 'config';
import { setTokens, deleteTokens } from 'services/actions';
import { tokensSelector } from 'services/selectors';
import { validateTokens } from 'services/utils';
import { applyAccessTokenExternally } from 'modules/tokens/modules/external';

import { refreshTokens } from '../actions';
import { appSelect } from 'services/utils/reduxSaga';
import type { PetrusTokens } from 'types';

export default function* refreshTokensHandler() {
    yield takeLeading(refreshTokens.request, function* (action) {
        try {
            const tokens = action.payload ? action.payload : yield* appSelect(tokensSelector);

            if (!tokens?.refreshToken) {
                throw new PetrusError(
                    `Can't refresh access token without a refresh token. Received 'tokens': ${JSON.stringify(
                        tokens,
                        null,
                        2,
                    )}`,
                );
            }

            const refreshedTokens: PetrusTokens = yield config.handlers.refreshTokens(tokens as Required<PetrusTokens>);

            validateTokens(refreshedTokens);

            yield put(setTokens(refreshedTokens));

            yield* applyAccessTokenExternally(refreshedTokens);

            yield put(refreshTokens.success());
        } catch (e) {
            const error = e as Error;
            config.logger.error(error.toString());
            yield put(refreshTokens.failure(error));
            yield put(deleteTokens());
        }
    });
}
