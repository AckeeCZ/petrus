import { take, race, put, call } from 'redux-saga/effects';

import { AUTH_LOGIN_SUCCESS } from '../../actionType';
import { refreshTokens, setTokens, fetchAuthUserRequest, triedToRetrieveTokens } from '../../actions';
import * as Consts from '../../constants';

import config from '../config';

import { retrieveTokens, clearTokens } from './storageHandlers';
import { isAnyTokenExpired } from './utilities';

function* tokensRetrieval() {
    if (config.options.tokens.persistence === Consts.tokens.persistence.NONE) {
        yield clearTokens();
        return;
    }

    const { tokens } = yield race({
        tokens: retrieveTokens(),
        loginSuccess: take(AUTH_LOGIN_SUCCESS),
    });

    if (!tokens) {
        return;
    }

    if (isAnyTokenExpired(tokens)) {
        yield put(refreshTokens(tokens));
    } else {
        yield put(setTokens(tokens));
        yield put(fetchAuthUserRequest());
    }
}

export default function* tryToRetrieveTokens() {
    yield call(tokensRetrieval);

    yield put(triedToRetrieveTokens());
}
