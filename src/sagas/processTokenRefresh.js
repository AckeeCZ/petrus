import { put, select, takeEvery } from 'redux-saga/effects';

import { logout, startTokenRefresh, setTokens, stopTokenRefresh } from '../actions';
import { PROCESS_TOKEN_REFRESH } from '../actionType';
import { authTokens } from '../selectors';
import { logger } from '../config';

import config from './config';
import validateTokens from './utilities/validateTokens';

export function* tryToRefreshTokens(action) {
    const tokens = yield select(authTokens);
    yield put(startTokenRefresh(tokens));

    try {
        const refreshedTokens = yield config.remoteRefreshTokens({
            ...action.tokens,
            ...tokens,
        });

        validateTokens(refreshedTokens);

        yield put(setTokens(refreshedTokens));
        yield put(stopTokenRefresh(null, refreshedTokens));
    } catch (refreshError) {
        logger().error(refreshError);
        yield put(stopTokenRefresh(refreshError));
        yield put(logout());
    }
}

export default function*() {
    yield takeEvery(PROCESS_TOKEN_REFRESH, tryToRefreshTokens);
}
