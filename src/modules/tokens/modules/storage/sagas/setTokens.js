import { takeEvery } from 'redux-saga/effects';

import { setTokens } from 'services/actions';
import { storeTokens } from './storageHandlers';

export default function* setTokensHandler() {
    yield takeEvery(setTokens, function* (action) {
        // TODO: wrap it with try/catch (extend SET_TOKENS to async action type)
        yield* storeTokens(action.payload);
    });
}
