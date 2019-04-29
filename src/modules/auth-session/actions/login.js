import types from './types';

export const loginRequest = credentials => ({
    type: types.LOGIN_REQUEST,
    payload: credentials,
});

export const loginSuccess = () => ({
    type: types.LOGIN_SUCCESS,
});

export const loginFailure = error => ({
    type: types.LOGIN_FAILURE,
    error,
});
