import { select } from 'redux-saga/effects';
import { removeItem, setItem, getItem } from 'localforage';

import * as Consts from '../../constants';
import { tokensPersistence } from '../../selectors';

import config from '../config';
import { storage } from '../../config';

const { LOCAL, SESSION } = Consts.tokens.persistence;

export function* clearTokens() {
    storage.session.removeItem(config.tokensKey);
    yield removeItem(config.tokensKey);
}

export function* storeTokens(tokens, forcedPersistence) {
    const persistence = yield select(tokensPersistence);

    switch (forcedPersistence || persistence) {
        case LOCAL:
            storage.session.removeItem(config.tokensKey);
            yield setItem(config.tokensKey, tokens);
            break;

        case SESSION:
            yield removeItem(config.tokensKey);
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
            return yield getItem(config.tokensKey);

        case SESSION: {
            yield removeItem(config.tokensKey);
            const stringifiedTokens = storage.session.getItem(config.tokensKey);
            return JSON.parse(stringifiedTokens);
        }

        default:
            return null;
    }
}
