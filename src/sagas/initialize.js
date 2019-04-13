import { all } from 'redux-saga/effects';

import tokens, { tryToRetrieveTokens, setTokensPersistence } from './tokens';
import handleLogin from './handleLogin';
import processTokenRefresh from './processTokenRefresh';
import fetchAuthUser from './fetchAuthUser';
import { authState } from './authState';
import handleDirectLogin from './handleDirectLogin';
import documentVisibility from './documentVisibility';

export default function* saga() {
    yield all([
        authState(),
        tokens(),
        handleLogin(),
        handleDirectLogin(),
        processTokenRefresh(),
        fetchAuthUser(),
        documentVisibility(),
        tryToRetrieveTokens(),
        setTokensPersistence(),
    ]);
}
