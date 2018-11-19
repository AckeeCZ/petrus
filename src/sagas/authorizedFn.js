import { select, call, take } from 'redux-saga/effects';

import { authTokens, authUser, isLoggedIn, isRefreshing } from '../selectors';
import { AUTH_REFRESH_TOKEN_FAILURE, AUTH_REFRESH_TOKEN_SUCCESS } from '../actionType';

import config from './config';
import { tryToRefreshTokens } from './processTokenRefresh';

export default function* authorizedFn(fn) {
    const processFn = function*() {
        const tokens = yield select(authTokens);
        const user = yield select(authUser);
        return yield call(() =>
            fn({
                ...tokens,
                user,
            }),
        );
    };

    // If token refreshing is being processed, wait for it to finish
    if (yield select(isRefreshing)) {
        yield take([AUTH_REFRESH_TOKEN_FAILURE, AUTH_REFRESH_TOKEN_SUCCESS]);
    }

    try {
        const result = yield processFn();
        if (config.detectShouldRefresh(null, result)) {
            yield tryToRefreshTokens();
            if (yield select(isLoggedIn)) {
                return yield processFn();
            }
        }
        return result;
    } catch (e) {
        if (config.detectShouldRefresh(e, null)) {
            yield tryToRefreshTokens();
            if (yield select(isLoggedIn)) {
                return yield processFn();
            }
        }
        // None of my business, pass error along
        throw e;
    }
}
