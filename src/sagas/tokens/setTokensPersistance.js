import { takeLatest } from 'redux-saga/effects';

import { logger } from '../../config';
import * as Consts from '../../constants';
import { SET_TOKENS_PERSISTENCE } from '../../actionType';
import { clearTokens, retrieveTokens, storeTokens } from './storageHandlers';

const { LOCAL, SESSION, NONE } = Consts.tokens.persistence;

function* applyTokensPersistence(persitance) {
    switch (persitance) {
        case LOCAL: {
            const tokens = yield retrieveTokens(SESSION);

            if (tokens) {
                yield storeTokens(tokens);
            }
            break;
        }

        case SESSION: {
            const tokens = yield retrieveTokens(LOCAL);

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
    const { persitance } = action;

    try {
        yield applyTokensPersistence(persitance);
    } catch (error) {
        logger.error(error);
    }
}

export default function*() {
    yield takeLatest(SET_TOKENS_PERSISTENCE, setTokensPersistence);
}
