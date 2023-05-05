import { put, takeEvery } from 'redux-saga/effects';

import { config, PetrusError, PetrusErrorType } from 'config';
import { refreshTokens } from '../actions';

import { setTokens } from 'services/actions';
import { cancelTimer, setTimer } from './tokensExpirationTimer';
import { validateExpiration } from './utils';

export default function* setTokensHandler() {
    yield takeEvery(setTokens, function* (action) {
        const { expiration } = action.payload.accessToken;

        if (expiration === null || expiration === undefined) {
            yield* cancelTimer();
            return;
        }

        if (!validateExpiration(expiration)) {
            const min = config.tokens.minRequiredExpiration;
            const minDate = new Date(Date.now() + min);
            // eslint-disable-next-line max-len
            const minRequired = `Minimal required access token expiration is ${min}ms (at ${minDate.toISOString()}).`;
            const cantSet = `Expiration at ${expiration} it too low.`;
            config.logger.error(
                new PetrusError(
                    PetrusErrorType.SET_ACCESS_TOKEN_REFRESHMENT_TIMER_FAILURE,
                    `${minRequired}\n${cantSet}`,
                ),
            );
            return;
        }

        yield* cancelTimer();

        yield* setTimer(expiration, function* () {
            yield put(refreshTokens.request());
        });
    });
}
