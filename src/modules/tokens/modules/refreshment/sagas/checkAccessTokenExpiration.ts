import { takeEvery, put } from 'redux-saga/effects';

import { entitiesSelector } from 'services/selectors';
import { appSelect } from 'services/utils/reduxSaga';

import { refreshTokens, checkAccessTokenExpiration } from '../actions';
import { isTokenExpired } from './utils';

export function* refreshExpiredToken() {
    const { tokens } = yield* appSelect(entitiesSelector);

    if (tokens && isTokenExpired(tokens.accessToken)) {
        yield put(refreshTokens.request(tokens));
    }
}

export default function* checkAccessTokenExpirationHandler() {
    yield takeEvery(checkAccessTokenExpiration, refreshExpiredToken);
}
