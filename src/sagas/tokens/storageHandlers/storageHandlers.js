import { select } from 'redux-saga/effects';
import * as IndexedDBStorage from './IndexedDBWrapper';

import * as Consts from '../../../constants';
import { tokensPersistence } from '../../../selectors';

import config from '../../config';
import { storage } from '../../../config';

const { LOCAL, SESSION } = Consts.tokens.persistence;

export function* clearTokens() {
    storage.session.removeItem(config.tokensKey);
    yield IndexedDBStorage.remove(config.tokensKey);
}

export function* storeTokens(tokens, forcedPersistence) {
    const persistence = yield select(tokensPersistence);

    switch (forcedPersistence || persistence) {
        case LOCAL:
            storage.session.removeItem(config.tokensKey);
            yield IndexedDBStorage.set(config.tokensKey, tokens);
            break;

        case SESSION:
            yield IndexedDBStorage.remove(config.tokensKey);
            storage.session.setItem(config.tokensKey, JSON.stringify(tokens));
            break;

        default:
    }
}

export function* retrieveTokens(forcedPersistence) {
    const persistence = yield select(tokensPersistence);

    switch (forcedPersistence || persistence) {
        case LOCAL:
            storage.session.removeItem(config.tokensKey);
            return yield IndexedDBStorage.get(config.tokensKey);

        case SESSION: {
            yield IndexedDBStorage.remove(config.tokensKey);
            const stringifiedTokens = storage.session.getItem(config.tokensKey);
            return JSON.parse(stringifiedTokens);
        }

        default:
            return null;
    }
}
