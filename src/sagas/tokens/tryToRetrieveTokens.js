import { take, race, put } from 'redux-saga/effects';

import { AUTH_LOGIN_SUCCESS } from '../../actionType';
import { refreshTokens, setTokens, fetchAuthUserRequest } from '../../actions';
import * as Consts from '../../constants';

import config from '../config';

import { retrieveTokens, clearTokens } from './storageHandlers';
import { isAnyTokenExpired } from './utilities';

export default function* tryToRetrieveTokens() {
    if (config.options.tokens.persistance !== Consts.tokens.persistence.LOCAL) {
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
        yield put(refreshTokens());
    } else {
        yield put(setTokens(tokens));
        yield put(fetchAuthUserRequest());
    }
}
