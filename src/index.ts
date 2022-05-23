import { logout, setUserWithTokens, login } from 'modules/auth-session';
import {
    checkAccessTokenExpiration,
    tokensPersistence as TokensPersistence,
    setTokensPersistence,
    retrievalTypes,
    applyAccessTokenResolve,
    unapplyAccessTokenResolve,
    externalTypes,
} from 'modules/tokens';

import { types, terminate } from './services/actions';

const {
    AUTH_SESSION_START,
    AUTH_SESSION_END,
    AUTH_SESSION_PAUSE,
    AUTH_SESSION_RESUME,
    ACCESS_TOKEN_AVAILABLE,
    ACCESS_TOKEN_UNAVAILABLE,
} = types as any;

const { RETRIEVE_TOKENS_REQUEST, RETRIEVE_TOKENS_RESOLVE } = retrievalTypes;

const { APPLY_ACCESS_TOKEN_REQUEST, UNAPPLY_ACCESS_TOKEN_REQUEST } = externalTypes as any;

export const logoutRequest = logout.request;
export const loginRequest = login.request;
export const LOGIN_SUCCESS = login.success.type;
export const LOGIN_FAILURE = login.failure.type;

export {
    // actions
    setUserWithTokens,
    checkAccessTokenExpiration,
    setTokensPersistence,
    applyAccessTokenResolve,
    unapplyAccessTokenResolve,
    terminate,
    //
    // action types types
    AUTH_SESSION_START,
    AUTH_SESSION_END,
    AUTH_SESSION_PAUSE,
    AUTH_SESSION_RESUME,
    ACCESS_TOKEN_AVAILABLE,
    ACCESS_TOKEN_UNAVAILABLE,
    RETRIEVE_TOKENS_REQUEST,
    RETRIEVE_TOKENS_RESOLVE,
    APPLY_ACCESS_TOKEN_REQUEST,
    UNAPPLY_ACCESS_TOKEN_REQUEST,
    //
    // constants
    TokensPersistence,
};

export { default as configure } from './configure';
export { default as authorizable } from './HOC/authorizable';
export { withAuthSession, getAuthStateChannel, getAccessToken } from './services/sagas';
export { entitiesSelector, apiSelector } from './services/selectors';
export { createExpirationDate } from './modules/oAuth';
export { StorageDrivers } from './config';
export { AuthSession as SessionState, FlowType } from './constants';
export { retrieveTokens } from 'modules/tokens/modules/retrieval';

export * from './hooks/useAuthenticated';
export * from './components/Authenticated';
