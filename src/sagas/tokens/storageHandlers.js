import { select } from 'redux-saga/effects';
import localforage from 'localforage';

import * as Consts from '../../constants';
import { tokensPersistence } from '../../selectors';

import config from '../config';

const { LOCAL, SESSION } = Consts.tokens.persistence;

export function* clearTokens() {
    window.sessionStorage.removeItem(config.tokensKey);
    yield localforage.removeItem(config.tokensKey);
}

export function* storeTokens(tokens, forcedPersistence) {
    const persistence = yield select(tokensPersistence);

    switch (forcedPersistence || persistence) {
        case LOCAL:
            window.sessionStorage.removeItem(config.tokensKey);
            yield localforage.setItem(config.tokensKey, tokens);
            break;

        case SESSION:
            yield localforage.removeItem(config.tokensKey);
            window.sessionStorage.setItem(config.tokensKey, JSON.stringify(tokens));
            break;

        default:
    }
}

export function* retrieveTokens(forcedPersistence) {
    const persistence = yield select(tokensPersistence);

    switch (forcedPersistence || persistence) {
        case LOCAL:
            window.sessionStorage.removeItem(config.tokensKey);
            return yield localforage.getItem(config.tokensKey);

        case SESSION: {
            yield localforage.removeItem(config.tokensKey);
            const stringifiedTokens = window.sessionStorage.getItem(config.tokensKey);
            return JSON.parse(stringifiedTokens);
        }

        default:
            return null;
    }
}
