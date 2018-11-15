import { take, put } from 'redux-saga/effects';

import { FETCH_AUTH_USER_REQUEST } from '../actionType';
import { fetchAuthUserFailure, fetchAuthUserSuccess } from '../actions';

import config from './config';

function* fetchAuthUser() {
    try {
        const user = yield config.remoteGetAuthUser();

        yield put(fetchAuthUserSuccess(user));
    } catch (e) {
        yield put(fetchAuthUserFailure(e));
        throw e;
    }
}

export default function*() {
    while (true) {
        yield take(FETCH_AUTH_USER_REQUEST);
        yield fetchAuthUser();
    }
}
