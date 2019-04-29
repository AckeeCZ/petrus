import types from './types';

export const fetchUserRequest = () => ({
    type: types.FETCH_USER_REQUEST,
});

export const fetchUserSuccess = payload => ({
    type: types.FETCH_USER_SUCCESS,
    payload,
});

export const fetchUserFailure = error => ({
    type: types.FETCH_USER_FAILURE,
    error,
});
