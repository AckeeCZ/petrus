import { takeEvery } from 'redux-saga/effects';

import { deleteTokens } from 'services/actions';

import { cancelTimer } from './tokensExpirationTimer';

export default function* deleteTokensHandler() {
    yield takeEvery(deleteTokens, cancelTimer);
}
