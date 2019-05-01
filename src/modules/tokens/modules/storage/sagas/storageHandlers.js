import { select } from 'redux-saga/effects';

import { storage } from 'Config';
import { tokensPersistenceSelector } from 'Services/selectors';

import { TOKENS_KEY } from '../config';
import { tokensPersistence } from '../constants';

const { LOCAL, SESSION } = tokensPersistence;

export function* clearTokens() {
    storage.session.removeItem(TOKENS_KEY);
    yield storage.indexedDB.remove(TOKENS_KEY);
}

export function* storeTokens(tokens, forcedPersistence) {
    const persistence = yield select(tokensPersistenceSelector);

    switch (forcedPersistence || persistence) {
        case LOCAL:
            storage.session.removeItem(TOKENS_KEY);
            yield storage.indexedDB.set(TOKENS_KEY, tokens);
            break;

        case SESSION:
            yield storage.indexedDB.remove(TOKENS_KEY);
            storage.session.setItem(TOKENS_KEY, JSON.stringify(tokens));
            break;

        default:
    }
}

export function* retrieveTokens(forcedPersistence) {
    const persistence = yield select(tokensPersistenceSelector);

    switch (forcedPersistence || persistence) {
        case LOCAL:
            storage.session.removeItem(TOKENS_KEY);
            return yield storage.indexedDB.get(TOKENS_KEY);

        case SESSION: {
            yield storage.indexedDB.remove(TOKENS_KEY);
            const stringifiedTokens = storage.session.getItem(TOKENS_KEY);
            return JSON.parse(stringifiedTokens);
        }

        default:
            return null;
    }
}
