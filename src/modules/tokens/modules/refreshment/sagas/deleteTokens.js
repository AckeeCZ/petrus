import { takeEvery } from 'redux-saga/effects';

import { types } from 'Services/actions';

import { resetTimer } from '../utils/TokensExpirationTimer';

export default function*() {
    yield takeEvery(types.DELETE_TOKENS, resetTimer);
}
