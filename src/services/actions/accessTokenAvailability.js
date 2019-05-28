import types from './types';

export const accessTokenAvailable = accessToken => ({
    type: types.ACCESS_TOKEN_AVAILABLE,
    payload: accessToken,
});

export const accessTokenUnavailable = () => ({
    type: types.ACCESS_TOKEN_UNAVAILABLE,
});
