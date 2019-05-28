import { takeEvery } from 'redux-saga/effects';

import { types } from 'Services/actions';
import { storeTokens } from './storageHandlers';

// TODO: wrap it with try/catch (extend SET_TOKENS to async action type)
function* setTokens(action) {
    yield storeTokens(action.payload);
}

export default function*() {
    yield takeEvery(types.SET_TOKENS, setTokens);
}
