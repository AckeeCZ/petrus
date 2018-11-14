import { all } from 'redux-saga/effects';

import initializeAuthStateChannel from './authStateChannel';
import tokens, { tryToRetrieveTokens } from './tokens';
import handleLogin from './handleLogin';
import processTokenRefresh from './processTokenRefresh';

export { default as configure } from './configure';
export { default as authorizedFn } from './authorizedFn';

export function* saga() {
    yield all([initializeAuthStateChannel(), handleLogin(), processTokenRefresh(), tokens(), tryToRetrieveTokens()]);
}
