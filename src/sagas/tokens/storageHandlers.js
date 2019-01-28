import { select, all } from 'redux-saga/effects';
import localforage from 'localforage';
import { executeInWindow } from '@ackee/redux-worker/worker';

import * as Consts from '../../constants';
import { tokensPersistence } from '../../selectors';

import config from '../config';

const { LOCAL, SESSION } = Consts.tokens.persistence;

export function* clearTokens() {
    yield all([
        executeInWindow('sessionStorage.removeItem', [config.tokensKey]),
        localforage.removeItem(config.tokensKey),
    ]);
}

export function* storeTokens(tokens, forcedPersistence) {
    const persistence = yield select(tokensPersistence);

    switch (forcedPersistence || persistence) {
        case LOCAL:
            yield executeInWindow('sessionStorage.removeItem', [config.tokensKey]);
            yield localforage.setItem(config.tokensKey, tokens);
            break;

        case SESSION:
            yield localforage.removeItem(config.tokensKey);
            yield executeInWindow('sessionStorage.setItem', [config.tokensKey, JSON.stringify(tokens)]);
            break;

        default:
    }
}

export function* retrieveTokens(forcedPersistence) {
    const persistence = yield select(tokensPersistence);

    switch (forcedPersistence || persistence) {
        case LOCAL:
            yield executeInWindow('sessionStorage.removeItem', [config.tokensKey]);
            return yield localforage.getItem(config.tokensKey);

        case SESSION: {
            yield localforage.removeItem(config.tokensKey);
            const stringifiedTokens = yield executeInWindow('sessionStorage.getItem', [config.tokensKey]);
            return JSON.parse(stringifiedTokens);
        }

        default:
            return null;
    }
}
