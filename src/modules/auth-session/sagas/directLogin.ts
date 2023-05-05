import { put, take, takeLeading } from 'redux-saga/effects';

import { config, isPetrusError, PetrusError, PetrusErrorType } from 'config';
import { setTokens } from 'services/actions';

import { validateTokens } from 'services/utils';
import { appSelect } from 'services/utils/reduxSaga';
import { fetchUser, login, logout, setUserWithTokens } from '../actions';
import { loginSelector } from '../selectors';

export default function* directLogin() {
    yield takeLeading(setUserWithTokens, function* (action) {
        try {
            const loginApiState = yield* appSelect(loginSelector);

            if (loginApiState.success) {
                yield put(logout.request());
                yield take([logout.success, logout.failure]);
            }

            const { user, tokens } = action.payload;

            validateTokens(tokens);

            yield put(fetchUser.success(user));
            yield put(setTokens(tokens));

            yield put(login.success());
        } catch (e) {
            if (isPetrusError(e)) {
                config.logger.error(e);
                yield put(login.failure(e));
            } else {
                const error = new PetrusError(
                    PetrusErrorType.DIRECT_LOGIN_FAILURE,
                    `Failed to set user with tokens.`,
                    e as Error,
                );
                config.logger.error(error);
                yield put(login.failure(error));
            }
        }
    });
}
