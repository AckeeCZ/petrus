import { select } from 'redux-saga/effects';

import { config } from 'Config';
import { tokensPersistenceSelector } from 'Services/selectors';

import { TOKENS_KEY } from '../config';

export const storageDriver = persistence => config.mapStorageDriverToTokensPersistence[persistence];

export function* clearTokens(forcedPersistence) {
    const persistence = yield select(tokensPersistenceSelector);

    yield storageDriver(persistence || forcedPersistence).remove(TOKENS_KEY);
}

export function* storeTokens(tokens, forcedPersistence) {
    const persistence = yield select(tokensPersistenceSelector);

    yield storageDriver(persistence || forcedPersistence).set(TOKENS_KEY, tokens);
}

export function* retrieveTokens(forcedPersistence) {
    const persistence = yield select(tokensPersistenceSelector);

    return yield storageDriver(persistence || forcedPersistence).get(TOKENS_KEY);
}
