import { put, select, call, takeLeading } from 'redux-saga/effects';

import { PetrusError, config } from 'config';
import { tokensSelector } from 'services/selectors';

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
        config.logger.error(e.toString());
        yield put(fetchUserFailure(e));
    }
}

export default function* () {
    yield takeLeading(types.FETCH_USER_REQUEST, fetchUser);
}
