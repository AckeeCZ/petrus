import { takeEvery, call, put, select, take, all } from 'redux-saga/effects';

import { logger } from './config';
import { authTokens, authUser, isLoggedIn, isRefreshing } from './selectors';
import { startTokenRefresh, stopTokenRefresh, setTokens, logout, stopLogin } from './actions';
import { AUTH_LOGIN, AUTH_REFRESH_TOKEN_SUCCESS, AUTH_REFRESH_TOKEN_FAILURE, PROCESS_TOKEN_REFRESH } from './actionType';

let remoteLogin = null;
let remoteRefreshTokens = null;
let detectShouldRefresh = null;

export const configure = config => {
    const { authenticate, refreshTokens, shouldRefresh } = config;

    if (typeof authenticate !== 'function') {
        remoteLogin = credentials => {
            logger.error(`Cannot authenticate use with ${credentials}: Supply authenticate function first.`);
            return {
                user: null,
                tokens: {},
            };
        };
    } else {
        remoteLogin = authenticate;
    }

    if (typeof refreshTokens !== 'function') {
        remoteRefreshTokens = tokens => {
            logger.error('Cannot refresh tokens. No refresh tokens fn supplied.');
            return tokens;
        };
    } else {
        remoteRefreshTokens = refreshTokens;
    }

    if (typeof shouldRefresh !== 'function') {
        detectShouldRefresh = (error, response) => {
            return !!error;
        };
    } else {
        detectShouldRefresh = shouldRefresh;
    }
};

const processTokenRefresh = function* () {
    const tokens = yield select(authTokens);
    yield put(startTokenRefresh(tokens));
    try {
        const refreshedTokens = yield remoteRefreshTokens(tokens);
        yield put(stopTokenRefresh(null, refreshedTokens));
        yield put(setTokens(refreshedTokens));
    } catch (refreshError) {
        yield put(stopTokenRefresh(refreshError));
        yield put(logout());
    }
};

export const saga = function* () {
    const handleLogin = function* (action) {
        try {
            const { user, tokens } = yield call(() => remoteLogin(action.credentials));

            yield put(stopLogin(null, user));
            yield put(setTokens(tokens));
        } catch (e) {
            yield put(stopLogin(e));
            logger.error(`Failed to login user: ${e.message}`);
        }
    };
    yield all([yield takeEvery(AUTH_LOGIN, handleLogin), yield takeEvery(PROCESS_TOKEN_REFRESH, processTokenRefresh)]);
};

export const authorizedFn = function* (fn) {
    const processFn = function* () {
        const tokens = yield select(authTokens);
        const user = yield select(authUser);
        return yield call(() =>
            fn({
                ...tokens,
                user,
            })
        );
    };

    // If token refreshing is being processed, wait for it to finish
    if (yield select(isRefreshing)) {
        yield take([AUTH_REFRESH_TOKEN_FAILURE, AUTH_REFRESH_TOKEN_SUCCESS]);
    }

    try {
        const result = yield processFn();
        if (detectShouldRefresh(null, result)) {
            yield processTokenRefresh();
            if (yield select(isLoggedIn)) {
                return yield processFn();
            }
        }
        return result;
    } catch (e) {
        if (detectShouldRefresh(e, null)) {
            yield processTokenRefresh();
            if (yield select(isLoggedIn)) {
                return yield processFn();
            }
        }
        // None of my business, pass error along
        throw e;
    }
};
