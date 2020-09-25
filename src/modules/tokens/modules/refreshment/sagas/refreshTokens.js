import { put, select, takeLeading } from 'redux-saga/effects';

import { config } from 'config';
import { setTokens, deleteTokens } from 'services/actions';
import { tokensSelector } from 'services/selectors';
import { validateTokens } from 'services/utils';
import { applyAccessTokenExternally } from 'modules/tokens/modules/external';

import { refreshTokensSuccess, refreshTokensFailure, types } from '../actions';

function* refreshTokens(action) {
    try {
        const tokens = action.payload ? action.payload : yield select(tokensSelector);

        const refreshedTokens = yield config.remoteHandlers.refreshTokens(tokens);

        validateTokens(refreshedTokens);

        yield put(setTokens(refreshedTokens));

        yield applyAccessTokenExternally(refreshedTokens);

        yield put(refreshTokensSuccess());
    } catch (e) {
        config.logger.error(e.toString());
        yield put(refreshTokensFailure(e));
        yield put(deleteTokens());
    }
}

export default function* () {
    yield takeLeading(types.REFRESH_TOKENS_REQUEST, refreshTokens);
}
