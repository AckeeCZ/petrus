import { takeEvery, put } from 'redux-saga/effects';

import { config } from 'config';
import { types } from 'services/actions';
import { refreshTokensRequest } from '../actions';

import { setTimer, cancelTimer } from './tokensExpirationTimer';
import { validateExpiration } from './utils';

function* handleSetTokens(action) {
    const { expiration } = action.payload.accessToken;

    if (expiration !== undefined) {
        if (!validateExpiration(expiration)) {
            const min = config.tokens.minRequiredExpiration;
            const minDate = new Date(Date.now() + min);
            const minRequired = `Minimal required access token expiration is ${min}ms (at ${minDate.toISOString()}).`;
            const cantSet = `Expiration at ${expiration} it too low.`;
            config.logger.error(`${minRequired}\n${cantSet}`);
            return;
        }

        yield cancelTimer();

        yield setTimer(expiration, function* () {
            yield put(refreshTokensRequest());
        });
    } else {
        yield cancelTimer();
    }
}

export default function* () {
    yield takeEvery(types.SET_TOKENS, handleSetTokens);
}
