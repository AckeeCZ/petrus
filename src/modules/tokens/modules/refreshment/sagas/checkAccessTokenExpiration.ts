import { put, takeEvery } from 'redux-saga/effects';

import { entitiesSelector } from 'services/selectors';
import { appSelect } from 'services/utils/reduxSaga';

import { checkAccessTokenExpiration, refreshTokens } from '../actions';
import { isTokenExpired } from './utils';

function* refreshExpiredToken() {
    const { tokens } = yield* appSelect(entitiesSelector);

    if (tokens && isTokenExpired(tokens.accessToken)) {
        yield put(refreshTokens.request(tokens));
    }
}

export default function* checkAccessTokenExpirationHandler() {
    yield takeEvery(checkAccessTokenExpiration, refreshExpiredToken);
}
