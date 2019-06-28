import { put, select, takeLeading } from 'redux-saga/effects';

import { config } from 'Config';
import { setTokens, deleteTokens } from 'Services/actions';
import { tokensSelector } from 'Services/selectors';
import { validateTokens } from 'Services/utils';
import { applyAccessTokenExternally } from 'Modules/tokens';

import { refreshTokensSuccess, refreshTokensFailure, types } from '../actions';

function* refreshTokens(action) {
    try {
        const tokens = yield select(tokensSelector);

        const refreshedTokens = yield config.remoteHandlers.refreshTokens(action.payload || tokens);

        validateTokens(refreshedTokens);

        yield put(setTokens(refreshedTokens));

        yield applyAccessTokenExternally(tokens);

        yield put(refreshTokensSuccess());
    } catch (e) {
        config.logger.error(e);
        yield put(refreshTokensFailure(e.message));
        yield put(deleteTokens());
    }
}

export default function*() {
    yield takeLeading(types.REFRESH_TOKENS_REQUEST, refreshTokens);
}
