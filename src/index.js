import { login, stopLogin, logout, setTokens, refreshTokens, setTokensPersistence, setUserWithTokens } from './actions';
import { authUser, isLoggedIn, isLoggingIn, loginErrors, tokensPersistence } from './selectors';

export const actions = {
    login,
    stopLogin,
    logout,
    setTokens,
    refreshTokens,
    setTokensPersistence,
    setUserWithTokens,
};

export const selectors = {
    authUser,
    isLoggedIn,
    isLoggingIn,
    loginErrors,
    tokensPersistence,
};

export * as actionTypes from './actionType';

export { configure, withAuthSession, getAuthStateChannel } from './sagas';

export * as constants from './constants';

export * as HOC from './HOC';
