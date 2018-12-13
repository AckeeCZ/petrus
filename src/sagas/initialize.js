import { all } from 'redux-saga/effects';

import tokens, { tryToRetrieveTokens, setTokensPersistence } from './tokens';
import handleLogin from './handleLogin';
import processTokenRefresh from './processTokenRefresh';
import fetchAuthUser from './fetchAuthUser';
import { authState } from './authState';

export default function* saga() {
    yield all([
        authState(),
        tokens(),
        handleLogin(),
        processTokenRefresh(),
        fetchAuthUser(),
        tryToRetrieveTokens(),
        setTokensPersistence(),
    ]);
}
