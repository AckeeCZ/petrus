import { login, stopLogin, logout, setTokens, refreshTokens, setTokensPersistence } from './actions';
import { tokens } from './constants';

export const actions = {
    login,
    stopLogin,
    logout,
    setTokens,
    refreshTokens,
    setTokensPersistence,
};

export const constants = {
    tokens,
};
