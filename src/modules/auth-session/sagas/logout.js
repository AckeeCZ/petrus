import { takeLeading, put } from 'redux-saga/effects';

import { config } from 'config';
import { deleteTokens } from 'services/actions';
import { types, logoutSuccess, logoutFailure } from '../actions';

function requestFrame() {
    return new Promise(res => {
        window.requestAnimationFrame(res);
    });
}

function* logout() {
    try {
        yield put(deleteTokens());

        // NOTE: It mustn't proceed unless 'flowType' was set to `anonymous`.
        // Otherwise application will be still in `authenticated` flowType.
        // And if we'd remove auth user the app relies on, an error might be thrown.
        yield requestFrame();

        yield put(logoutSuccess());
    } catch (e) {
        config.logger.error(e.toString());
        yield put(logoutFailure(e));
    }
}

export default function* () {
    yield takeLeading(types.LOGOUT_REQUEST, logout);
}
