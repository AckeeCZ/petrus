import { eventChannel } from 'redux-saga';
import { take, put } from 'redux-saga/effects';

import { config } from 'config';
import { checkAccessTokenExpiration } from '../actions';

function createVisibilityChangeChannel() {
    return eventChannel<DocumentVisibilityState>(emit => {
        function handler() {
            emit(globalThis.document.visibilityState);
        }

        globalThis.document.addEventListener('visibilitychange', handler);

        return () => globalThis.document.removeEventListener('visibilitychange', handler);
    });
}

export default function* watchDocumentVisibilityChange() {
    if (!globalThis.document || !config.tokens.checkTokenExpirationOnTabFocus) {
        return;
    }

    const channel = createVisibilityChangeChannel();

    while (true) {
        const visibilityState: DocumentVisibilityState = yield take(channel);

        switch (visibilityState) {
            case 'visible':
                yield put(checkAccessTokenExpiration());
                break;

            case 'hidden':
                // TODO: consider to give developer an option to pause auto. refreshing (switch petrus to 'hibernate mode')
                break;

            default:
        }
    }
}
