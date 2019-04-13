import { put, takeEvery, select } from 'redux-saga/effects';

import { stopLogin, setTokens, logout } from '../actions';
import { SET_USER_WITH_TOKENS } from '../actionType';
import { logger } from '../config';
import { isLoggedIn } from '../selectors';

const handleSetUserWithTokens = function*(action) {
    try {
        const isAuth = yield select(isLoggedIn);

        if (isAuth) {
            yield put(logout());
        }

        const { user, tokens } = action;

        yield put(setTokens(tokens));
        yield put(stopLogin(null, user));
    } catch (e) {
        yield put(stopLogin(e));
        logger().error(`Failed to set user with tokens: ${e.message}.\n`, e);
    }
};

export default function*() {
    yield takeEvery(SET_USER_WITH_TOKENS, handleSetUserWithTokens);
}
