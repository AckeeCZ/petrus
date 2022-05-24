import { logout, setUserWithTokens, login } from 'modules/auth-session';
import {
    checkAccessTokenExpiration,
    TokensPersistence,
    setTokensPersistence,
    applyAccessTokenResolve,
    unapplyAccessTokenResolve,
    applyAccessTokenRequest,
    unapplyAccessTokenRequest,
    retrieveTokensRequest,
    retrieveTokensResolve,
} from 'modules/tokens';

import {
    terminate,
    authSessionStart,
    authSessionEnd,
    accessTokenUnavailable,
    accessTokenAvailable,
    authSessionResume,
    authSessionPause,
} from './services/actions';

export const logoutRequest = logout.request;
export const loginRequest = login.request;
export const LOGIN_SUCCESS = login.success.type;
export const LOGIN_FAILURE = login.failure.type;
export const AUTH_SESSION_START = authSessionStart.type;
export const AUTH_SESSION_END = authSessionEnd.type;
export const AUTH_SESSION_PAUSE = authSessionPause.type;
export const AUTH_SESSION_RESUME = authSessionResume.type;
export const ACCESS_TOKEN_AVAILABLE = accessTokenAvailable.type;
export const ACCESS_TOKEN_UNAVAILABLE = accessTokenUnavailable.type;
export const APPLY_ACCESS_TOKEN_REQUEST = applyAccessTokenRequest.type;
export const UNAPPLY_ACCESS_TOKEN_REQUEST = unapplyAccessTokenRequest.type;
export const RETRIEVE_TOKENS_REQUEST = retrieveTokensRequest.type;
export const RETRIEVE_TOKENS_RESOLVE = retrieveTokensResolve.type;

export {
    // actions
    setUserWithTokens,
    checkAccessTokenExpiration,
    setTokensPersistence,
    applyAccessTokenResolve,
    unapplyAccessTokenResolve,
    terminate,
    logout,
    login,
    authSessionStart,
    authSessionEnd,
    authSessionPause,
    authSessionResume,
    accessTokenAvailable,
    accessTokenUnavailable,
    applyAccessTokenRequest,
    unapplyAccessTokenRequest,
    retrieveTokensRequest,
    retrieveTokensResolve,
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
