import { strictObjectAccess } from '@ackee/redux-utils';

export const AuthSession = strictObjectAccess({
    ACTIVE: 'ACTIVE',
    PAUSED: 'PAUSED',
    INACTIVE: 'INACTIVE',
});

export const apiKeys = strictObjectAccess({
    FETCH_USER: 'fetchUser',
    LOGIN: 'login',
    LOGOUT: 'logout',
    REFRESH_TOKENS: 'refreshTokens',
    RETRIEVE_TOKENS: 'retrieveTokens',
});

export const FlowType = strictObjectAccess({
    INDETERMINATE: 'indeterminate',
    ANONYMOUS: 'anonymous',
    AUTHENTICATED: 'authenticated',
});
