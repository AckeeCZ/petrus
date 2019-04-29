import { takeEvery, select, put } from 'redux-saga/effects';

import { tokensSelector } from 'Services/selectors';

import { types, refreshTokensRequest } from '../actions';
import { isAnyTokenExpired } from '../utils';

export default function* checkAccessTokenExpiration() {
    yield takeEvery(types.CHECK_ACCESS_TOKEN_EXPIRATION, function*() {
        const tokens = yield select(tokensSelector);

        if (isAnyTokenExpired(tokens)) {
            yield put(refreshTokensRequest(tokens));
        }
    });
}
