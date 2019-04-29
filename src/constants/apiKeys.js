import { strictObjectAccess } from '@ackee/redux-utils';

export const apiKeys = strictObjectAccess({
    FETCH_USER: 'fetchUser',
    LOGIN: 'login',
    LOGOUT: 'logout',
    REFRESH_TOKENS: 'refreshTokens',
    RETRIEVE_TOKENS: 'retrieveTokens',
});
