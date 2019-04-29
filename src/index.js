import {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    setUserWithTokens,
    types as authSessionTypes,
} from 'Modules/auth-session';
import {
    refreshTokensRequest,
    checkAccessTokenExpiration,
    tokensPersistence as TokensPersistence,
} from 'Modules/tokens';

import { setTokens, types } from './services/actions';
import { authUser, isLoggedIn, isLoggingIn, loginErrors, tokensPersistence } from './services/selectors';

import * as HOC from './HOC';

export { HOC };

export { configure } from './configure';

// TODO: export only selected action types
export const actionTypes = {
    ...types,
    ...authSessionTypes,
};

export const actions = {
    loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    setTokens,
    refreshTokensRequest,
    setUserWithTokens,
    checkAccessTokenExpiration,
};

export const constants = {
    tokens: {
        persistence: TokensPersistence,
    },
};

export const selectors = {
    authUser,
    isLoggedIn,
    isLoggingIn,
    loginErrors,
    tokensPersistence,
};

export { withAuthSession, getAuthStateChannel } from './services/sagas';
