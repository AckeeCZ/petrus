import { loginRequest, logoutRequest, setUserWithTokens, types as authSessionTypes } from 'Modules/auth-session';
import {
    checkAccessTokenExpiration,
    tokensPersistence as TokensPersistence,
    setTokensPersistence,
    retrievalTypes,
} from 'Modules/tokens';

import { types } from './services/actions';

const {
    AUTH_SESSION_START,
    AUTH_SESSION_END,
    AUTH_SESSION_PAUSE,
    AUTH_SESSION_RESUME,
    ACCESS_TOKEN_AVAILABLE,
    ACCESS_TOKEN_UNAVAILABLE,
} = types;

const { RETRIEVE_TOKENS_REQUEST, RETRIEVE_TOKENS_RESOLVE } = retrievalTypes;

const { LOGIN_SUCCESS, LOGIN_FAILURE } = authSessionTypes;

export {
    // actions
    loginRequest,
    logoutRequest,
    setUserWithTokens,
    checkAccessTokenExpiration,
    setTokensPersistence,
    //
    // action types types
    AUTH_SESSION_START,
    AUTH_SESSION_END,
    AUTH_SESSION_PAUSE,
    AUTH_SESSION_RESUME,
    ACCESS_TOKEN_AVAILABLE,
    ACCESS_TOKEN_UNAVAILABLE,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    RETRIEVE_TOKENS_REQUEST,
    RETRIEVE_TOKENS_RESOLVE,
    //
    // constants
    TokensPersistence,
};

export { default as configure } from './configure';
export { default as authorizable } from './HOC/authorizable';
export { withAuthSession, getAuthStateChannel } from './services/sagas';
export { entitiesSelector, apiSelector } from './services/selectors';
export { createExpirationDate } from './modules/oAuth';
