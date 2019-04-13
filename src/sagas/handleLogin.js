import { put, call, takeEvery } from 'redux-saga/effects';

import { stopLogin, setTokens } from '../actions';
import { AUTH_LOGIN } from '../actionType';
import { logger } from '../config';

import config from './config';
import validateTokens from './utilities/validateTokens';

const handleLogin = function*(action) {
    try {
        const { user, tokens } = yield call(() => config.remoteLogin(action.credentials));

        validateTokens(tokens);

        yield put(setTokens(tokens));
        yield put(stopLogin(null, user));
    } catch (e) {
        yield put(stopLogin(e));
        logger().warn(`Failed to login user: ${e.message}`);
    }
};

export default function*() {
    yield takeEvery(AUTH_LOGIN, handleLogin);
}
