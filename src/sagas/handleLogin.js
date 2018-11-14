import { put, call, takeEvery } from 'redux-saga/effects';

import { stopLogin, setTokens } from '../actions';
import { AUTH_LOGIN } from '../actionType';
import { logger } from '../config';

import config from './config';

const handleLogin = function*(action) {
    try {
        const { user, tokens } = yield call(() => config.remoteLogin(action.credentials));

        yield put(stopLogin(null, user));
        yield put(setTokens(tokens));
    } catch (e) {
        yield put(stopLogin(e));
        logger.warn(`Failed to login user: ${e.message}`);
    }
};

export default function*() {
    yield takeEvery(AUTH_LOGIN, handleLogin);
}
