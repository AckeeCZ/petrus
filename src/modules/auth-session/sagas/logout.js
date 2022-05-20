import { takeLeading, put } from 'redux-saga/effects';

import { config, globalEnv } from 'config';
import { deleteTokens } from 'services/actions';
import { logout } from '../actions';

function requestFrame() {
    return new Promise(res => {
        if (globalEnv.requestAnimationFrame) {
            window.requestAnimationFrame(res);
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
        config.logger.error(e.toString());
        yield put(logout.failure(e));
    }
}

export default function* () {
    yield takeLeading(logout.request, logoutHandler);
}
