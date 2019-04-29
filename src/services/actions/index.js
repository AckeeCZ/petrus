import types from './types';

export const setTokens = tokens => ({
    type: types.SET_TOKENS,
    payload: tokens,
});

export const deleteTokens = () => ({
    type: types.DELETE_TOKENS,
});

export { types };
export * from './authSession';
export * from './accessTokenAvailability';
