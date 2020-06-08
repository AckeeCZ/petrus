import { takeLatest } from 'redux-saga/effects';

import { config } from 'config';
import { tokensPersistence } from 'modules/tokens/modules/storage/constants';

import { types } from '../actions';

import { clearTokens, retrieveTokens, storeTokens } from './storageHandlers';

function* applyTokensPersistence(persistence) {
    const { LOCAL, SESSION, NONE } = tokensPersistence;

    switch (persistence) {
        case SESSION:
        case LOCAL: {
            const tokens = yield retrieveTokens(persistence === LOCAL ? SESSION : LOCAL);

            if (tokens) {
                yield storeTokens(tokens);
            }
            break;
        }

        case NONE: {
            yield clearTokens();
            break;
        }
        default:
    }
}

function* setTokensPersistence(action) {
    try {
        yield applyTokensPersistence(action.persistence);
    } catch (e) {
        config.logger.error(e);
    }
}

export default function* () {
    yield takeLatest(types.SET_TOKENS_PERSISTENCE, setTokensPersistence);
}
