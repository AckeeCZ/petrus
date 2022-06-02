export enum AuthSession {
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    INACTIVE = 'INACTIVE',
}

export enum ApiKeys {
    FETCH_USER = 'fetchUser',
    LOGIN = 'login',
    LOGOUT = 'logout',
    REFRESH_TOKENS = 'refreshTokens',
    RETRIEVE_TOKENS = 'retrieveTokens',
}

export enum FlowType {
    /**
     * Auth user and access token might be available – `flowType` hasn't been resolved yet.
     */
    INDETERMINATE = 'indeterminate',
    /**
     * Access token isn't avail. or valid, or auth. user isn't avail.
     */
    ANONYMOUS = 'anonymous',
    /**
     * Access token is avail. and valid, and auth. user is avail.
     */
    AUTHENTICATED = 'authenticated',
}

/**
 * @ignore
 */
export const ACTION_PREFIX = '@@petrus/';
