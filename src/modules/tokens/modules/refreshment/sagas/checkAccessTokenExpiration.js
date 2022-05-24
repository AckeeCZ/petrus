import { takeEvery, select, put } from 'redux-saga/effects';

import { tokensSelector } from 'services/selectors';

import { refreshTokensRequest, checkAccessTokenExpiration } from '../actions';
import { isTokenExpired } from './utils';

export function* refreshExpiredToken() {
    const tokens = yield select(tokensSelector);

    if (tokens && isTokenExpired(tokens.accessToken)) {
        yield put(refreshTokensRequest(tokens));
    }
}

export default function* checkAccessTokenExpirationHandler() {
    yield takeEvery(checkAccessTokenExpiration, refreshExpiredToken);
}
