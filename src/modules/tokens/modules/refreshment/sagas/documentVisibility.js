import { eventChannel } from 'redux-saga';
import { take, put } from 'redux-saga/effects';

import { globalEnv, config } from 'config';
import { checkAccessTokenExpiration } from '../actions';

function createVisibilityChangeChannel() {
    return eventChannel(emit => {
        function handler() {
            emit(globalEnv.document.visibilityState);
        }

        globalEnv.document.addEventListener('visibilitychange', handler);

        return () => globalEnv.document.removeEventListener('visibilitychange', handler);
    });
}

export default function* watchDocumentVisibilityChange() {
    if (!globalEnv.document || !config.tokens.checkTokenExpirationOnTabFocus) {
        return;
    }

    const channel = yield createVisibilityChangeChannel();

    const visibilityStates = {
        VISIBLE: 'visible',
        HIDDEN: 'hidden',
    };

    while (true) {
        const visibilityState = yield take(channel);

        switch (visibilityState) {
            case visibilityStates.VISIBLE:
                yield put(checkAccessTokenExpiration());
                break;

            case visibilityStates.HIDDEN:
                // TODO: consider to give developer an option to pause auto. refreshing (switch petrus to 'hibernate mode')
                break;

            default:
        }
    }
}
