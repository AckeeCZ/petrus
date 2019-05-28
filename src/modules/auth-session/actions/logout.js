import types from './types';

export const logoutRequest = () => ({
    type: types.LOGOUT_REQUEST,
});

export const logoutSuccess = payload => ({
    type: types.LOGOUT_SUCCESS,
    payload,
});

export const logoutFailure = error => ({
    type: types.LOGOUT_FAILURE,
    error,
});
