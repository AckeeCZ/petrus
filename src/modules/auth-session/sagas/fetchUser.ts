import { put, takeLeading } from 'redux-saga/effects';

import { PetrusError, config } from 'config';
import { entitiesSelector } from 'services/selectors';

import { fetchUser, login } from '../actions';
import type { PetrusUser } from 'types';
import { appSelect } from 'services/utils/reduxSaga';

function* fetchUserHandler() {
    try {
        const { tokens } = yield* appSelect(entitiesSelector);

        if (!tokens) {
            throw new PetrusError(`Can't call 'getAuthUser' handler while the tokens are missing.`);
        }

        /* @ts-expect-error */
        const user: PetrusUser = yield config.handlers.getAuthUser(tokens);

        if (!user) {
            throw new PetrusError(`'getAuthUser' method must return authorized user.`);
        }

        yield put(fetchUser.success(user));

        yield put(login.success());
    } catch (e) {
        const error = e as Error;
        config.logger.error(error.toString());
        yield put(fetchUser.failure(error));
    }
}

export default function* handleFetchingUser() {
    yield takeLeading(fetchUser.request, fetchUserHandler);
}
