import { AUTH_LOGIN_SUCCESS, AUTH_LOGIN_FAILURE, AUTH_LOGOUT, SET_AUTH_TOKENS } from './actionType';

import { authUser, isLoggedIn, isLoggingIn, loginErrors } from './selectors';

import { login, stopLogin, logout, setTokens, refreshTokens } from './actions';

export { reducer } from './reducer';

export * as sagas from './sagas';

export * as statusTypes from './statusTypes';

export * as constants from './constants';

export const actions = {
    login,
    stopLogin,
    logout,
    setTokens,
    refreshTokens,
};

export const selectors = {
    authUser,
    isLoggedIn,
    isLoggingIn,
    loginErrors,
};

export const actionTypes = {
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    SET_AUTH_TOKENS,
};
