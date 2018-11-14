import { channel } from 'redux-saga';
import { put, call, takeEvery, fork } from 'redux-saga/effects';

import * as types from '../../actionType';
import {
    accessTokenAvailable,
    accessTokenUnavailable,
    authSessionStart,
    authSessionEnd,
    authSessionPause,
    authSessionResume,
} from '../../statuses';

import { runAuthSagas, cancelAuthSagas } from './withAuthSession';

let authStateChannel = null;

function* hydrateAuthStateChannel(chan) {
    yield takeEvery(types.SET_TOKENS, function*(action) {
        const { token } = action.tokens.accessToken;
        yield put(chan, accessTokenAvailable(token));
    });

    yield takeEvery([types.AUTH_REFRESH_TOKEN_FAILURE, types.AUTH_LOGOUT], function*() {
        yield put(chan, accessTokenUnavailable());
    });

    yield takeEvery(types.AUTH_LOGIN_SUCCESS, function*() {
        yield put(chan, authSessionStart());
        yield runAuthSagas();
    });

    yield takeEvery(types.AUTH_LOGOUT, function*() {
        yield put(chan, authSessionEnd());
        yield cancelAuthSagas();
    });

    yield takeEvery(types.AUTH_REFRESH_TOKEN, function*() {
        yield put(chan, authSessionPause());
    });

    yield takeEvery([types.AUTH_REFRESH_TOKEN_SUCCESS], function*() {
        yield put(chan, authSessionResume());
    });
}

/**
 * Create authStateChannel and link Redux actions to channel statuses.
 */
function* initializeAuthStateChannel() {
    authStateChannel = yield call(channel);
    yield fork(hydrateAuthStateChannel, authStateChannel);
}

/**
 * Method for getting authStateChannel
 */
export function* getAuthStateChannel() {
    if (!authStateChannel) {
        yield initializeAuthStateChannel();
    }

    return authStateChannel;
}
