import { takeLeading, put } from 'redux-saga/effects';

import { config, PetrusError, PetrusErrorType } from 'config';
import { deleteTokens } from 'services/actions';
import { logout } from '../actions';

function requestFrame() {
    return new Promise<void>(res => {
        if ('requestAnimationFrame' in globalThis) {
            window.requestAnimationFrame(() => {
                res();
            });
        } else {
            res();
        }
    });
}

function* logoutHandler() {
    try {
        yield put(deleteTokens());

        // NOTE: It mustn't proceed unless 'flowType' was set to `anonymous`.
        // Otherwise application will be still in `authenticated` flowType.
        // And if we'd remove auth user the app relies on, an error might be thrown.
        yield requestFrame();

        yield put(logout.success());
    } catch (e) {
        const error = new PetrusError(PetrusErrorType.LOGOUT_FAILURE, 'Failed to logout.', e as Error);
        config.logger.error(error);
        yield put(logout.failure(error));
    }
}

export default function* handleLogout() {
    yield takeLeading(logout.request, logoutHandler);
}
