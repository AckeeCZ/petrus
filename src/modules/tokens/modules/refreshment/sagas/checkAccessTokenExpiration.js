import { takeEvery, select, put } from 'redux-saga/effects';

import { tokensSelector } from 'services/selectors';

import { types, refreshTokensRequest } from '../actions';
import { isTokenExpired } from './utils';

export function* refreshExpiredToken() {
    const tokens = yield select(tokensSelector);

    if (tokens && isTokenExpired(tokens.accessToken)) {
        yield put(refreshTokensRequest(tokens));
    }
}

export default function* checkAccessTokenExpiration() {
    yield takeEvery(types.CHECK_ACCESS_TOKEN_EXPIRATION, refreshExpiredToken);
}
