export enum AuthSession {
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    INACTIVE = 'INACTIVE',
}

export enum apiKeys {
    FETCH_USER = 'fetchUser',
    LOGIN = 'login',
    LOGOUT = 'logout',
    REFRESH_TOKENS = 'refreshTokens',
    RETRIEVE_TOKENS = 'retrieveTokens',
}

export enum FlowType {
    INDETERMINATE = 'indeterminate',
    ANONYMOUS = 'anonymous',
    AUTHENTICATED = 'authenticated',
}

export const ACTION_PREFIX = '@@petrus/';
