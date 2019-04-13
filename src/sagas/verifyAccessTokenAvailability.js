import { takeEvery, select, put } from 'redux-saga/effects';

import { VERIFY_ACCESS_TOKEN_AVAILABILITY } from '../actionType';
import { refreshTokens } from '../actions';
import { authTokens as authTokensSelector } from '../selectors';
import { isAnyTokenExpired } from './tokens/utilities';

export default function* verifyAccessTokenAvailability() {
    yield takeEvery(VERIFY_ACCESS_TOKEN_AVAILABILITY, function*() {
        const tokens = yield select(authTokensSelector);

        if (isAnyTokenExpired(tokens)) {
            yield put(refreshTokens(tokens));
        }
    });
}
