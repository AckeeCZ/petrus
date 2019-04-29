import { select } from 'redux-saga/effects';

import { config, storage } from 'Config';
import { tokensPersistenceSelector } from 'Services/selectors';

import { tokensPersistence } from '../constants';

const { LOCAL, SESSION } = tokensPersistence;

export function* clearTokens() {
    storage.session.removeItem(config.tokensKey);
    yield storage.indexedDB.remove(config.tokensKey);
}

export function* storeTokens(tokens, forcedPersistence) {
    const persistence = yield select(tokensPersistenceSelector);

    switch (forcedPersistence || persistence) {
        case LOCAL:
            storage.session.removeItem(config.tokensKey);
            yield storage.indexedDB.set(config.tokensKey, tokens);
            break;

        case SESSION:
            yield storage.indexedDB.remove(config.tokensKey);
            storage.session.setItem(config.tokensKey, JSON.stringify(tokens));
            break;

        default:
    }
}

export function* retrieveTokens(forcedPersistence) {
    const persistence = yield select(tokensPersistenceSelector);

    switch (forcedPersistence || persistence) {
        case LOCAL:
            storage.session.removeItem(config.tokensKey);
            return yield storage.indexedDB.get(config.tokensKey);

        case SESSION: {
            yield storage.indexedDB.remove(config.tokensKey);
            const stringifiedTokens = storage.session.getItem(config.tokensKey);
            return JSON.parse(stringifiedTokens);
        }

        default:
            return null;
    }
}
