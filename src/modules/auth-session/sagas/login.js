import { put, call, takeLeading } from 'redux-saga/effects';

import { config, PetrusError } from 'config';
import { setTokens } from 'services/actions';
import { validateTokens } from 'services/utils';
import { applyAccessTokenExternally } from 'modules/tokens/modules/external';

import { types, loginSuccess, loginFailure, fetchUserSuccess } from '../actions';

const handleLogin = function* (action) {
    try {
        const response = yield call(config.remoteHandlers.authenticate, action.payload);

        if (!response) {
            throw new PetrusError(`'authenticate' must return object with 'user' and 'tokens'.`);
        }

        let { user, tokens } = response;

        validateTokens(tokens);
        yield put(setTokens(tokens));
        yield applyAccessTokenExternally(tokens);

        if (!user) {
            user = yield call(config.remoteHandlers.getAuthUser, tokens);
        }
        yield put(fetchUserSuccess(user));

        yield put(loginSuccess());
    } catch (e) {
        config.logger.error(new PetrusError(`User login failed: ${e.toString()}`));
        yield put(loginFailure(e));
    }
};

export default function* () {
    yield takeLeading(types.LOGIN_REQUEST, handleLogin);
}
