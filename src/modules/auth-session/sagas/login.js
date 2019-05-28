import { put, call, takeLeading } from 'redux-saga/effects';

import { config, PetrusError } from 'Config';
import { setTokens } from 'Services/actions';
import { validateTokens } from 'Services/utils';

import { types, loginSuccess, loginFailure, fetchUserSuccess } from '../actions';

const handleLogin = function*(action) {
    try {
        const response = yield call(config.remoteHandlers.authenticate, action.payload);

        if (!response) {
            throw new PetrusError(`'authenticate' must return object with 'user' and 'tokens'.`);
        }

        const { user, tokens } = response;

        validateTokens(tokens);

        yield put(fetchUserSuccess(user));
        yield put(setTokens(tokens));

        yield put(loginSuccess());
    } catch (e) {
        config.logger.error(`User login failed: ${e.message}`);
        yield put(loginFailure(e.message));
    }
};

export default function*() {
    yield takeLeading(types.LOGIN_REQUEST, handleLogin);
}
