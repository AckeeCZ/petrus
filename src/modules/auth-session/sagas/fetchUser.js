import { put, select, call, takeLeading } from 'redux-saga/effects';

import { PetrusError, config } from 'config';
import { tokensSelector } from 'services/selectors';

import { fetchUser, loginSuccess } from '../actions';

function* fetchUserHandler() {
    try {
        const tokens = yield select(tokensSelector);

        const user = yield call(config.remoteHandlers.getAuthUser, tokens);

        if (!user) {
            throw new PetrusError(`'getAuthUser' method must return authorized user.`);
        }

        yield put(fetchUser.success(user));

        yield put(loginSuccess());
    } catch (e) {
        config.logger.error(e.toString());
        yield put(fetchUser.failure(e));
    }
}

export default function* () {
    yield takeLeading(fetchUser.request, fetchUserHandler);
}
