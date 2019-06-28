import types from './types';

export const applyAccessTokenRequest = accessToken => ({
    type: types.APPLY_ACCESS_TOKEN_REQUEST,
    payload: accessToken,
});

export const applyAccessTokenResolve = () => ({
    type: types.APPLY_ACCESS_TOKEN_RESOLVE,
});

export const unapplyAccessTokenRequest = () => ({
    type: types.UNAPPLY_ACCESS_TOKEN_REQUEST,
});

export const unapplyAccessTokenResolve = () => ({
    type: types.UNAPPLY_ACCESS_TOKEN_RESOLVE,
});
