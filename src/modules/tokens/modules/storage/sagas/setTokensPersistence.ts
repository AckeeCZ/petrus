import { takeLatest } from 'redux-saga/effects';

import { config, isPetrusError, PetrusError, PetrusErrorType } from 'config';
import { TokensPersistence } from 'modules/tokens/modules/storage/constants';

import { setTokensPersistence } from '../actions';

import { clearTokens, retrieveTokens, storeTokens } from './storageHandlers';

function* applyTokensPersistence(persistence: TokensPersistence) {
    const { LOCAL, SESSION, NONE } = TokensPersistence;

    switch (persistence) {
        case SESSION:
        case LOCAL: {
            const tokens = yield* retrieveTokens(persistence === LOCAL ? SESSION : LOCAL);

            if (tokens) {
                yield* storeTokens(tokens);
            }
            break;
        }

        case NONE: {
            yield* clearTokens();
            break;
        }
        default:
    }
}

export default function* setTokensPersistenceHandler() {
    yield takeLatest(setTokensPersistence, function* (action) {
        try {
            yield applyTokensPersistence(action.payload);
        } catch (e) {
            if (isPetrusError(e)) {
                config.logger.error(e);
            } else {
                config.logger.error(
                    new PetrusError(
                        PetrusErrorType.SET_TOKENS_PERSISTENCE_FAILURE,
                        'Failed to set tokens persistence.',
                        e as Error,
                    ),
                );
            }
        }
    });
}
