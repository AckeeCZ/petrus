import { all } from 'redux-saga/effects';

import tokens, { tryToRetrieveTokens } from './tokens';
import handleLogin from './handleLogin';
import processTokenRefresh from './processTokenRefresh';
import fetchAuthUser from './fetchAuthUser';

export * from './authStateChannel';
export { default as configure } from './configure';
export { default as authorizedFn } from './authorizedFn';

export function* saga() {
    yield all([handleLogin(), processTokenRefresh(), fetchAuthUser(), tokens(), tryToRetrieveTokens()]);
}
