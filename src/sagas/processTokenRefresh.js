import { put, select, takeEvery } from 'redux-saga/effects';

import { logout, startTokenRefresh, setTokens, stopTokenRefresh } from '../actions';
import { PROCESS_TOKEN_REFRESH } from '../actionType';
import { authTokens } from '../selectors';

import config from './config';

export function* processTokenRefresh(action) {
    const tokens = yield select(authTokens);
    yield put(startTokenRefresh(tokens));

    try {
        const refreshedTokens = yield config.remoteRefreshTokens({
            ...action.tokens,
            ...tokens,
        });
        yield put(stopTokenRefresh(null, refreshedTokens));
        yield put(setTokens(refreshedTokens));
    } catch (refreshError) {
        yield put(stopTokenRefresh(refreshError));
        yield put(logout());
    }
}

export default function*() {
    yield takeEvery(PROCESS_TOKEN_REFRESH, processTokenRefresh);
}
