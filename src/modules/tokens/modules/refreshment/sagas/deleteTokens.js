import { takeEvery } from 'redux-saga/effects';

import { types } from 'Services/actions';

import { cancelTimer } from './tokensExpirationTimer';

export default function*() {
    yield takeEvery(types.DELETE_TOKENS, cancelTimer);
}
