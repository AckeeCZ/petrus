import { config } from 'config';
import { takeEvery } from 'redux-saga/effects';

import { deleteTokens } from 'services/actions';
import { clearTokens } from './storageHandlers';

export default function* deleteTokensHandler() {
    yield takeEvery(deleteTokens, function* () {
        try {
            // TODO: extend DELETE_TOKENS to async action type
            yield* clearTokens();
        } catch (e) {
            config.logger.error(e);
        }
    });
}
