import { takeEvery } from 'redux-saga/effects';

import { deleteTokens } from 'services/actions';
import { clearTokens } from './storageHandlers';

export default function* deleteTokensHandler() {
    // TODO: wrap it with try/catch (extend DELETE_TOKENS to async action type)
    yield takeEvery(deleteTokens, function* () {
        yield* clearTokens();
    });
}
