import { config } from 'config';
import { takeEvery } from 'redux-saga/effects';

import { setTokens } from 'services/actions';
import { storeTokens } from './storageHandlers';

export default function* setTokensHandler() {
    yield takeEvery(setTokens, function* (action) {
        try {
            // TODO:extend SET_TOKENS to async action type
            yield* storeTokens(action.payload);
        } catch (e) {
            config.logger.error(e);
        }
    });
}
