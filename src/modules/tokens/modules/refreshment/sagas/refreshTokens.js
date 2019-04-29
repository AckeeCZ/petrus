import { put, select, takeEvery } from 'redux-saga/effects';

import { config } from 'Config';
import { setTokens } from 'Services/actions';
import { tokensSelector } from 'Services/selectors';
import { validateTokens } from 'Services/utils';

import { refreshTokensSuccess, refreshTokensFailure, types } from '../actions';

function* refreshTokens() {
    try {
        const tokens = yield select(tokensSelector);

        const refreshedTokens = yield config.remoteHandlers.refreshTokens(tokens);

        validateTokens(refreshedTokens);

        yield put(setTokens(refreshedTokens));

        yield put(refreshTokensSuccess());
    } catch (e) {
        config.logger.error(e);
        yield put(refreshTokensFailure(e.message));
    }
}

export default function*() {
    // yield takeLeading(types.REFRESH_TOKENS_REQUEST, refreshTokens);
    yield takeEvery(types.REFRESH_TOKENS_REQUEST, refreshTokens);
}
