import { take, put, call, select } from 'redux-saga/effects';

import { config } from 'Config';
import { setTokens } from 'Services/actions';
import { tokensPersistenceSelector } from 'Services/selectors';

import { getOAuthTokens } from 'Modules/oAuth';
import { fetchUserRequest } from 'Modules/auth-session';

import { tokensPersistence as TokensPersistence, storageHandlers } from '../../storage';
import { refreshTokensRequest, types as refreshTokensTypes, isAnyTokenExpired } from '../../refreshment';

import { retrieveTokensRequest, retrieveTokensResolve } from '../actions';

function* tokensRetrieval() {
    const tokensPersistence = yield select(tokensPersistenceSelector);

    if (tokensPersistence === TokensPersistence.NONE) {
        yield call(storageHandlers.clearTokens);
        return false;
    }

    let tokens = yield call(storageHandlers.retrieveTokens);

    if (config.oAuth.enabled) {
        // get the fresh tokens always as first
        const tokensFromOAuth = yield getOAuthTokens();

        if (tokensFromOAuth) {
            tokens = tokensFromOAuth;
        }
    }

    if (!tokens) {
        return false;
    }

    yield put(setTokens(tokens));

    if (isAnyTokenExpired(tokens)) {
        // TODO: check flow when retrieved tokens are expired
        yield put(refreshTokensRequest());
        // 'retrieveTokensResolve' action must be dispatched when tokens has been refreshed
        // otherwise authorizable HOC will render <Firewall/> which is wrong.
        yield take([refreshTokensTypes.REFRESH_TOKENS_SUCCESS, refreshTokensTypes.REFRESH_TOKENS_FAILURE]);
    }

    yield put(fetchUserRequest());

    return true;
}

export default function* tryToRetrieveTokens() {
    yield put(retrieveTokensRequest());

    const tokensRetrieved = yield call(tokensRetrieval);

    yield put(retrieveTokensResolve(tokensRetrieved));
}
