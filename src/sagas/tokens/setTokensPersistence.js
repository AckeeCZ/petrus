import { takeLatest } from 'redux-saga/effects';

import { logger } from '../../config';
import * as Consts from '../../constants';
import { SET_TOKENS_PERSISTENCE } from '../../actionType';
import { clearTokens, retrieveTokens, storeTokens } from './storageHandlers';

const { LOCAL, SESSION, NONE } = Consts.tokens.persistence;

function* applyTokensPersistence(persistence) {
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
    } catch (error) {
        logger().error(error);
    }
}

export default function*() {
    yield takeLatest(SET_TOKENS_PERSISTENCE, setTokensPersistence);
}
