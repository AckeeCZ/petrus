import { put, takeLeading } from 'redux-saga/effects';

import { PetrusError, config, PetrusErrorType, isPetrusError } from 'config';
import { entitiesSelector } from 'services/selectors';

import { fetchUser, login } from '../actions';
import type { PetrusUser } from 'types';
import { appSelect } from 'services/utils/reduxSaga';

function* fetchUserHandler() {
    try {
        const { tokens } = yield* appSelect(entitiesSelector);

        if (!tokens) {
            throw new PetrusError(
                PetrusErrorType.UNAVAILABLE_TOKENS,
                `Can't call 'getAuthUser' handler while the tokens are missing.`,
            );
        }

        /* @ts-expect-error */
        const user: PetrusUser = yield config.handlers.getAuthUser(tokens);

        if (!user) {
            throw new PetrusError(
                PetrusErrorType.UNAVAILABLE_AUTH_USER,
                `'getAuthUser' method must return authorized user.`,
            );
        }

        yield put(fetchUser.success(user));

        yield put(login.success());
    } catch (e) {
        if (isPetrusError(e)) {
            config.logger.error(e);
            yield put(fetchUser.failure(e));
        } else {
            const error = new PetrusError(
                PetrusErrorType.GET_AUTH_USER_FAILURE,
                'Failed to obtain auth user.',
                e as Error,
            );
            config.logger.error(error);
            yield put(fetchUser.failure(error));
        }
    }
}

export default function* handleFetchingUser() {
    yield takeLeading(fetchUser.request, fetchUserHandler);
}
