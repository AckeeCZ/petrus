import { login, stopLogin, logout, setTokens, refreshTokens, setTokensPersistence } from './actions';

export const actions = {
    login,
    stopLogin,
    logout,
    setTokens,
    refreshTokens,
    setTokensPersistence,
};

export * as actionTypes from './actionType';

export * as constants from './constants';

export * as HOC from './HOC';
