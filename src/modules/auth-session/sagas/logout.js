import { takeEvery, put } from 'redux-saga/effects';

import { config } from 'Config';
import { deleteTokens } from 'Services/actions';
import { types, logoutSuccess, logoutFailure } from '../actions';

function* logout() {
    try {
        yield put(deleteTokens());

        yield put(logoutSuccess());
    } catch (e) {
        config.logger.error(e);
        yield put(logoutFailure(e.message));
    }
}

export default function*() {
    // takeLeading
    yield takeEvery(types.LOGOUT_REQUEST, logout);
}
