import { take, race, put, call, select } from 'redux-saga/effects';

import { AUTH_LOGIN_SUCCESS } from '../../actionType';
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

    if (!tokens && config.oAuth.enabled) {
        tokens = yield getOAuthTokens();
    }

    if (!tokens) {
        return false;
    }

    if (isAnyTokenExpired(tokens)) {
        yield put(refreshTokens(tokens));
    } else {
        yield put(setTokens(tokens));
        yield put(fetchAuthUserRequest());
    }

    return true;
}

export default function* tryToRetrieveTokens() {
    yield put(retrieveTokensRequest());

    const tokensRetrieved = yield call(tokensRetrieval);

    yield put(retrieveTokensResolve(tokensRetrieved));
}
