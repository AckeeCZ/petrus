import { takeEvery } from 'redux-saga/effects';

import { types } from 'services/actions';
import { clearTokens } from './storageHandlers';

export default function* () {
    // TODO: wrap it with try/catch (extend DELETE_TOKENS to async action type)
    yield takeEvery(types.DELETE_TOKENS, function* () {
        yield clearTokens();
    });
}
