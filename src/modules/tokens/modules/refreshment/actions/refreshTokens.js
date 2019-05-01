import types from './types';

export const refreshTokensRequest = expiredTokens => ({
    type: types.REFRESH_TOKENS_REQUEST,
    payload: expiredTokens,
});

export const refreshTokensSuccess = () => ({
    type: types.REFRESH_TOKENS_SUCCESS,
});

export const refreshTokensFailure = error => ({
    type: types.REFRESH_TOKENS_FAILURE,
    error,
});
