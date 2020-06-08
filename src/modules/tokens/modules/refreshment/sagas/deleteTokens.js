import { takeEvery } from 'redux-saga/effects';

import { types } from 'services/actions';

import { cancelTimer } from './tokensExpirationTimer';

export default function* () {
    yield takeEvery(types.DELETE_TOKENS, cancelTimer);
}
