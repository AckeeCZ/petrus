import { takeEvery, put, select } from 'redux-saga/effects';

import { FETCH_AUTH_USER_REQUEST } from '../actionType';
import { fetchAuthUserFailure, fetchAuthUserSuccess } from '../actions';
import { isUserFetching } from '../selectors';

import config from './config';

function* fetchAuthUser() {
    try {
        const isFetching = yield select(isUserFetching);

        if (isFetching) return;

        const user = yield config.remoteGetAuthUser();

        yield put(fetchAuthUserSuccess(user));
    } catch (e) {
        yield put(fetchAuthUserFailure(e));
        throw e;
    }
}

export default function*() {
    yield takeEvery(FETCH_AUTH_USER_REQUEST, fetchAuthUser);
}
