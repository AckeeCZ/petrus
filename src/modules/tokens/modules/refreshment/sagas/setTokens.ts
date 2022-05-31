import { takeEvery, put } from 'redux-saga/effects';

import { config } from 'config';
import { refreshTokens } from '../actions';

import { setTimer, cancelTimer } from './tokensExpirationTimer';
import { validateExpiration } from './utils';
import { setTokens } from 'services/actions';

export default function* setTokensHandler() {
    yield takeEvery(setTokens, function* (action) {
        const { expiration } = action.payload.accessToken;

        if (expiration !== null && expiration !== undefined) {
            if (!validateExpiration(expiration)) {
                const min = config.tokens.minRequiredExpiration;
                const minDate = new Date(Date.now() + min);
                // eslint-disable-next-line max-len
                const minRequired = `Minimal required access token expiration is ${min}ms (at ${minDate.toISOString()}).`;
                const cantSet = `Expiration at ${expiration} it too low.`;
                config.logger.error(`${minRequired}\n${cantSet}`);
                return;
            }

            yield* cancelTimer();

            yield* setTimer(expiration, function* () {
                yield put(refreshTokens.request());
            });
        } else {
            yield* cancelTimer();
        }
    });
}
