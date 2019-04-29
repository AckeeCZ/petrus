import { takeEvery, put, select, call } from 'redux-saga/effects';

import { PetrusError, config } from 'Config';
import { tokensSelector } from 'Services/selectors';

import { types, fetchUserFailure, fetchUserSuccess, loginSuccess } from '../actions';

function* fetchUser() {
    try {
        const tokens = yield select(tokensSelector);

        const user = yield call(config.remoteHandlers.getAuthUser, tokens);

        if (!user) {
            throw new PetrusError(`'getAuthUser' method must return authorized user.`);
        }

        yield put(fetchUserSuccess(user));

        yield put(loginSuccess());
    } catch (e) {
        config.logger.error(e);
        yield put(fetchUserFailure(e.message));
    }
}

export default function*() {
    // TODO: takeLeading
    yield takeEvery(types.FETCH_USER_REQUEST, fetchUser);
}
