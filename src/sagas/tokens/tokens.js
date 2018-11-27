import { take, put, cancel, fork, takeEvery, all } from 'redux-saga/effects';

import { refreshTokens } from '../../actions';
import { ACCESS_TOKEN_UNAVAILABLE, SET_AUTH_TOKENS, AUTH_REFRESH_TOKEN_FAILURE } from '../../actionType';
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

function* setTokensHandler(refreshTokensTimeout, { tokens }) {
    clearLocaleStorageTokens();

    // store tokens to a local storage
    if (tokens) {
        yield storeTokens(tokens);
    }

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
        takeEvery(SET_AUTH_TOKENS, setTokensHandler, refreshTokensTimeout),

        // NOTE: AUTH_REFRESH_TOKEN_FAILURE must be also included,
        // because if expired tokens are retrived from a local storage,
        // Neither ACCESS_TOKEN_AVAILABLE will be dispatched, nor ACCESS_TOKEN_UNAVAILABLE
        takeEvery([ACCESS_TOKEN_UNAVAILABLE, AUTH_REFRESH_TOKEN_FAILURE], clearTokensHandler, refreshTokensTimeout),
    ]);
}
