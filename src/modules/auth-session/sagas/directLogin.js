import { put, takeLeading, select, take } from 'redux-saga/effects';

import { config } from 'config';
import { setTokens } from 'services/actions';
import { applyAccessTokenExternally } from 'modules/tokens/modules/external';

import { loginSuccess, loginFailure, logout, setUserWithTokens, fetchUser } from '../actions';
import { loginSelector } from '../selectors';

export default function* () {
    yield takeLeading(setUserWithTokens, function* (action) {
        try {
            const login = yield select(loginSelector);

            if (login.success) {
                yield put(logout.request());

                yield take([logout.success.type, logout.failure.type]);
            }

            const { user, tokens } = action.payload;

            // TODO: validate input

            yield put(fetchUser.success(user));
            yield put(setTokens(tokens));

            yield applyAccessTokenExternally(tokens);

            yield put(loginSuccess());
        } catch (e) {
            config.logger.error(`Failed to set user with tokens: ${e.toString()}.`);
            yield put(loginFailure(e));
        }
    });
}
