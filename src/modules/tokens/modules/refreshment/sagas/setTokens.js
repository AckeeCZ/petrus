import { takeEvery, cancel, take, put, fork } from 'redux-saga/effects';

import { config } from 'Config';
import { types } from 'Services/actions';
import { refreshTokensRequest } from '../actions';

import { TokensExpirationTimer, hasExpirationProperty } from '../utils';

function* handleTimeoutChannel(timeoutChannel) {
    while (true) {
        yield take(timeoutChannel);
        yield put(refreshTokensRequest());
    }
}

let timeoutChannelTask = null;

function* cancelTimeoutChannnelTask() {
    if (timeoutChannelTask) {
        yield cancel(timeoutChannelTask);
        timeoutChannelTask = null;
    }
}

function* handleSetTokens(action) {
    const tokens = action.payload;

    if (hasExpirationProperty(tokens)) {
        if (!TokensExpirationTimer.validateExpiration(tokens)) {
            const min = config.options.tokens.minRequiredExpiration;
            const minRequired = `Minimal required access token expiration is ${min}ms (at ${new Date(
                Date.now() + min,
            )}).`;
            const cantSet = `Access token expiration at ${tokens.accessToken.expiration} it too low.`;
            config.logger.error(`${minRequired}\n${cantSet}`);
            return;
        }

        // cancel any previous timeout
        yield cancelTimeoutChannnelTask();

        // create new timeout for refreshing tokens
        const channel = TokensExpirationTimer.setTimer(tokens);

        // and wait for token to expire
        timeoutChannelTask = yield fork(handleTimeoutChannel, channel);
    } else {
        yield cancelTimeoutChannnelTask();
    }
}

export default function*() {
    yield takeEvery(types.SET_TOKENS, handleSetTokens);
}
