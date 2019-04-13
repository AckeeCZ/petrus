import { take, put, select } from 'redux-saga/effects';

import { FETCH_AUTH_USER_REQUEST } from '../actionType';
import { fetchAuthUserFailure, fetchAuthUserSuccess } from '../actions';
import { authTokens } from '../selectors';
import { logger } from '../config';

import config from './config';

function* fetchAuthUser() {
    try {
        const tokens = yield select(authTokens);
        const user = yield config.remoteGetAuthUser(tokens);

        if (!user) {
            throw new Error(`'getAuthUser' method must return authorized user object, not: '${user}'.`);
        }

        yield put(fetchAuthUserSuccess(user));
    } catch (e) {
        yield put(fetchAuthUserFailure(e));
        logger().error(`Failed to fetch auth user:\n`, e);
    }
}

export default function*() {
    while (true) {
        yield take(FETCH_AUTH_USER_REQUEST);
        yield fetchAuthUser();
    }
}
