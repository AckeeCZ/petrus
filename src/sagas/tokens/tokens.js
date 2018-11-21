import { take, put, cancel, fork, takeEvery, race, all } from 'redux-saga/effects';

import { refreshTokens } from '../../actions';
import { SET_AUTH_TOKENS, AUTH_LOGOUT } from '../../actionType';
import { logger } from '../../config';

import config from '../config';

import RefreshTokensTimeout from './RefreshTokensTimeout';
import { storeTokens, clearTokens } from './storageHandlers';
import { hasExpirationProperty } from './utilities';

function* handleTimeoutChannel(timeoutChannel) {
    while (true) {
        yield take(timeoutChannel);
        yield put(refreshTokens());
    }
}

let timeoutChannelTask = null;

function* cancelTimeoutChannnelTask() {
    if (timeoutChannelTask) {
        yield cancel(timeoutChannelTask);
        timeoutChannelTask = null;
    }
}

function* clearTokensHandler(refreshTokensTimeout) {
    refreshTokensTimeout.clearTimeout();
    yield clearTokens();
    yield cancelTimeoutChannnelTask();
}

function clearLocaleStorageTokens() {
    // Previously tokens were stored in locale storage,
    // instead of IndexedDB as it it now.
    // So we need to delete them.
    window.localStorage.removeItem('tokens');
}

function* setTokensHandler({ tokens }, refreshTokensTimeout) {
    clearLocaleStorageTokens();

    // store tokens to a local storage
    yield storeTokens(tokens);

    if (hasExpirationProperty(tokens)) {
        if (!refreshTokensTimeout.validateExpiration(tokens)) {
            const min = config.options.tokens.minRequiredExpiration;
            const minRequired = `Minimal required access token expiration is ${min}ms (at ${new Date(
                Date.now() + min,
            )}).`;
            const cantSet = `Access token expiration at ${tokens.accessToken.expiration} it too low.`;
            logger.warn(`${minRequired}\n${cantSet}`);
            return;
        }

        // cancel any previous timeout
        yield cancelTimeoutChannnelTask();

        // create new timeout for refreshing tokens
        const channel = refreshTokensTimeout.setTimeout(tokens);

        // and wait for token to expire
        timeoutChannelTask = yield fork(handleTimeoutChannel, channel);
    } else {
        yield cancelTimeoutChannnelTask();
    }
}

export default function* tokensActionsHandlers() {
    const { requestDurationEstimate, minRequiredExpiration } = config.options.tokens;

    const refreshTokensTimeout = new RefreshTokensTimeout({
        requestDurationEstimate,
        minRequiredExpiration,
    });

    yield all([
        takeEvery(SET_AUTH_TOKENS, function* setAuthTokens(action) {
            yield race({
                task: setTokensHandler(action, refreshTokensTimeout),
                abort: take(AUTH_LOGOUT),
            });
        }),
        takeEvery(AUTH_LOGOUT, clearTokensHandler, refreshTokensTimeout),
    ]);
}
