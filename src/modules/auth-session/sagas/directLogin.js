import { put, takeLeading, select, take } from 'redux-saga/effects';

import { config } from 'Config';
import { setTokens } from 'Services/actions';
import { applyAccessTokenExternally } from 'Modules/tokens/modules/external';

import { loginSuccess, loginFailure, logoutRequest, types, fetchUserSuccess } from '../actions';
import { loginSelector } from '../selectors';

const handleSetUserWithTokens = function*(action) {
    try {
        const login = yield select(loginSelector);

        if (login.success) {
            yield put(logoutRequest());

            yield take([types.LOGOUT_SUCCESS, types.LOGOUT_FAILURE]);
        }

        const { user, tokens } = action.payload;

        // TODO: validate input

        yield put(fetchUserSuccess(user));
        yield put(setTokens(tokens));

        yield applyAccessTokenExternally(tokens);

        yield put(loginSuccess());
    } catch (e) {
        config.logger.error(`Failed to set user with tokens: ${e.message}.`);
        yield put(loginFailure(e));
    }
};

export default function*() {
    yield takeLeading(types.SET_USER_WITH_TOKENS, handleSetUserWithTokens);
}
