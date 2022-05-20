import { take, put, call, select } from 'redux-saga/effects';

import { config } from 'config';
import { setTokens, deleteTokens } from 'services/actions';
import { tokensPersistenceSelector } from 'services/selectors';

import { getMaybeOAuthTokens } from 'modules/oAuth';
import { fetchUser } from 'modules/auth-session';
import { applyAccessTokenExternally } from 'modules/tokens/modules/external';

import { tokensPersistence as TokensPersistence, storageHandlers } from '../../storage';
import { refreshTokensRequest, types as refreshTokensTypes, isTokenExpired } from '../../refreshment';

import { retrieveTokensRequest, retrieveTokensResolve } from '../actions';

function* tokensRetrieval() {
    const tokensPersistence = yield select(tokensPersistenceSelector);

    let tokens = yield call(storageHandlers.retrieveTokens);

    if (config.oAuth.enabled) {
        // get the fresh tokens always as first
        const tokensFromOAuth = yield* getMaybeOAuthTokens();

        if (tokensFromOAuth) {
            tokens = tokensFromOAuth;
        }
    }

    if (tokensPersistence === TokensPersistence.NONE) {
        yield put(deleteTokens());
    }

    if (!tokens || (!config.oAuth.enabled && tokensPersistence === TokensPersistence.NONE)) {
        return false;
    }

    if (isTokenExpired(tokens.accessToken)) {
        yield put(refreshTokensRequest(tokens));
        // 'retrieveTokensResolve' action must be dispatched when tokens has been refreshed
        // otherwise authorizable HOC will render <Firewall/> which is wrong.
        const result = yield take([
            refreshTokensTypes.REFRESH_TOKENS_SUCCESS,
            refreshTokensTypes.REFRESH_TOKENS_FAILURE,
        ]);

        if (result.type === refreshTokensTypes.REFRESH_TOKENS_FAILURE) {
            return false;
        }
    } else {
        yield put(setTokens(tokens));

        yield applyAccessTokenExternally(tokens);
    }

    yield put(fetchUser.request());

    const fetchUserResultAction = yield take([fetchUser.success.type, fetchUser.failure.type]);

    if (fetchUserResultAction.type === fetchUser.failure.type) {
        yield put(deleteTokens());
    }

    return fetchUserResultAction.type === fetchUser.success.type;
}

export function* retrieveTokens() {
    yield put(retrieveTokensRequest());

    const tokensRetrieved = yield call(tokensRetrieval);

    yield put(retrieveTokensResolve(tokensRetrieved));
}
