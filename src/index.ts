import { logout, setUserWithTokens, login } from 'modules/auth-session';
import {
    TokensPersistence,
    setTokensPersistence,
    applyAccessTokenResolve,
    unapplyAccessTokenResolve,
    applyAccessTokenRequest,
    unapplyAccessTokenRequest,
} from 'modules/tokens';
import { retrieveTokensRequest, retrieveTokensResolve } from 'modules/tokens/modules/retrieval';
import { checkAccessTokenExpiration } from 'modules/tokens/modules/refreshment';

import {
    terminate,
    authSessionStart,
    authSessionEnd,
    accessTokenUnavailable,
    accessTokenAvailable,
    authSessionResume,
    authSessionPause,
} from './services/actions';

/**
 * @deprecated use `logout.request`
 * @ignore
 */
export const logoutRequest = logout.request;

/**
 * @deprecated use `login.request`
 * @ignore
 */
export const loginRequest = login.request;

/**
 * @deprecated use `login.success.type`
 * @ignore
 */
export const LOGIN_SUCCESS = login.success.type;

/**
 * @deprecated use `login.failure.type`
 * @ignore
 */
export const LOGIN_FAILURE = login.failure.type;

/**
 * @deprecated use `authSessionStart.type`
 * @ignore
 */
export const AUTH_SESSION_START = authSessionStart.type;

/**
 * @deprecated use `authSessionEnd.type`
 * @ignore
 */
export const AUTH_SESSION_END = authSessionEnd.type;

/**
 * @deprecated use `authSessionPause.type`
 * @ignore
 */
export const AUTH_SESSION_PAUSE = authSessionPause.type;

/**
 * @deprecated use `authSessionResume.type`
 * @ignore
 */
export const AUTH_SESSION_RESUME = authSessionResume.type;

/**
 * @deprecated use `accessTokenAvailable.type`
 * @ignore
 */
export const ACCESS_TOKEN_AVAILABLE = accessTokenAvailable.type;

/**
 * @deprecated use `accessTokenUnavailable.type`
 * @ignore
 */
export const ACCESS_TOKEN_UNAVAILABLE = accessTokenUnavailable.type;

/**
 * @deprecated
 * @ignore
 */
export const APPLY_ACCESS_TOKEN_REQUEST = applyAccessTokenRequest.type;

/**
 * @deprecated use `unapplyAccessTokenRequest.type`
 * @ignore
 */
export const UNAPPLY_ACCESS_TOKEN_REQUEST = unapplyAccessTokenRequest.type;

/**
 * @deprecated use `retrieveTokensRequest.type`
 * @ignore
 */
export const RETRIEVE_TOKENS_REQUEST = retrieveTokensRequest.type;

/**
 * @deprecated use `retrieveTokensResolve.type`
 * @ignore
 */
export const RETRIEVE_TOKENS_RESOLVE = retrieveTokensResolve.type;

export {
    applyAccessTokenRequest,
    unapplyAccessTokenRequest,
    applyAccessTokenResolve,
    unapplyAccessTokenResolve,
    // ----
    setUserWithTokens,
    checkAccessTokenExpiration,
    setTokensPersistence,
    terminate,
    logout,
    login,
    authSessionStart,
    authSessionEnd,
    authSessionPause,
    authSessionResume,
    accessTokenAvailable,
    accessTokenUnavailable,
    retrieveTokensRequest,
    retrieveTokensResolve,
    TokensPersistence,
};

export { configure } from './configure';
export { default as authorizable } from './HOC/authorizable';
export { withAuthSession, getAuthStateChannel, getAccessToken } from './services/sagas';
export {
    entitiesSelector,
    apiSelector,
    tokensSelector,
    accessTokenSelector,
    tokensPersistenceSelector,
} from './services/selectors';
export { createExpirationDate } from './modules/oAuth';
export { storageDrivers } from './config';
export * from './constants';
export { retrieveTokens } from 'modules/tokens/modules/retrieval';

export * from './hooks/useAuthenticated';
export * from './components/Authenticated';

export * from './types';
export * from './config/types';
export type { RefreshTokensRequestPayload } from 'modules/tokens/modules/refreshment';
