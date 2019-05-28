import types from './types';

export const checkAccessTokenExpiration = () => ({
    type: types.CHECK_ACCESS_TOKEN_EXPIRATION,
});

export { types };
export * from './refreshTokens';
