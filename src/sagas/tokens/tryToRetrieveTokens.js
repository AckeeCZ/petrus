import { take, race, put, call, select } from 'redux-saga/effects';

import { AUTH_LOGIN_SUCCESS, AUTH_REFRESH_TOKEN_SUCCESS, AUTH_REFRESH_TOKEN_FAILURE } from '../../actionType';
import {
    refreshTokens,
    setTokens,
    fetchAuthUserRequest,
    retrieveTokensRequest,
    retrieveTokensResolve,
} from '../../actions';
import * as Consts from '../../constants';
import { tokensPersistence } from '../../selectors';

import config from '../config';

import { retrieveTokens, clearTokens } from './storageHandlers';
import { getOAuthTokens } from './oAuth';
import { isAnyTokenExpired } from './utilities';

function* tokensRetrieval() {
    const persistence = yield select(tokensPersistence);

    if (persistence === Consts.tokens.persistence.NONE) {
        yield clearTokens();
        return false;
    }

    let { tokens } = yield race({
        tokens: retrieveTokens(),
        loginSuccess: take(AUTH_LOGIN_SUCCESS),
    });

    if (config.oAuth.enabled) {
        // get the fresh tokens always first
        const tokensFromOAuth = yield getOAuthTokens();

        if (tokensFromOAuth) {
            tokens = tokensFromOAuth;
        }
    }

    if (!tokens) {
        return false;
    }

    if (isAnyTokenExpired(tokens)) {
        yield put(refreshTokens(tokens));
        // 'retrieveTokensResolve' action must be dispatched when tokens has been refreshed
        // otherwise authorizable HOC will render <Firewall/> which is wrong.
        yield take([AUTH_REFRESH_TOKEN_SUCCESS, AUTH_REFRESH_TOKEN_FAILURE]);
    } else {
        yield put(setTokens(tokens));
    }

    yield put(fetchAuthUserRequest());

    return true;
}

export default function* tryToRetrieveTokens() {
    yield put(retrieveTokensRequest());

    const tokensRetrieved = yield call(tokensRetrieval);

    yield put(retrieveTokensResolve(tokensRetrieved));
}
