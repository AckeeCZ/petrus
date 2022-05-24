import { takeLatest } from 'redux-saga/effects';

import { config } from 'config';
import { TokensPersistence } from 'modules/tokens/modules/storage/constants';

import { setTokensPersistence } from '../actions';

import { clearTokens, retrieveTokens, storeTokens } from './storageHandlers';

function* applyTokensPersistence(persistence) {
    const { LOCAL, SESSION, NONE } = TokensPersistence;

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

export default function* setTokensPersistenceHandler() {
    yield takeLatest(setTokensPersistence, function* (action) {
        try {
            yield applyTokensPersistence(action.persistence);
        } catch (e) {
            config.logger.error(e);
        }
    });
}
