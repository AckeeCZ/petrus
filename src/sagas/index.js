import { all } from 'redux-saga/effects';
import tokens, { tryToRetrieveTokens } from './tokens';
import handleLogin from './handleLogin';
import processTokenRefresh from './processTokenRefresh';
import fetchAuthUser from './fetchAuthUser';
import { authState } from './authState';

export { withAuthSession, getAuthStateChannel } from './authState';
export { default as configure } from './configure';
export { default as authorizedFn } from './authorizedFn';

export function* saga() {
    yield all([authState(), tokens(), handleLogin(), processTokenRefresh(), fetchAuthUser(), tryToRetrieveTokens()]);
}
