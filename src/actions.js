import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    SET_AUTH_TOKENS,
    PROCESS_TOKEN_REFRESH,
    AUTH_REFRESH_TOKEN,
    AUTH_REFRESH_TOKEN_FAILURE,
    AUTH_REFRESH_TOKEN_SUCCESS,
    FETCH_AUTH_USER_REQUEST,
    FETCH_AUTH_USER_SUCCESS,
    FETCH_AUTH_USER_FAILURE,
} from './actionType';

export const login = credentials => {
    return {
        type: AUTH_LOGIN,
        credentials,
    };
};

export const stopLogin = (error, user) => {
    if (error) {
        return {
            type: AUTH_LOGIN_FAILURE,
            error,
        };
    }
    return {
        type: AUTH_LOGIN_SUCCESS,
        user,
    };
};

export const logout = () => ({
    type: AUTH_LOGOUT,
});

export const setTokens = tokens => ({
    type: SET_AUTH_TOKENS,
    tokens,
});

export const refreshTokens = () => ({
    type: PROCESS_TOKEN_REFRESH,
});

export const startTokenRefresh = refreshToken => ({
    type: AUTH_REFRESH_TOKEN,
    refreshToken,
});

export const stopTokenRefresh = (error, tokens = {}) => {
    if (error) {
        return {
            type: AUTH_REFRESH_TOKEN_FAILURE,
            error,
        };
    }
    return {
        type: AUTH_REFRESH_TOKEN_SUCCESS,
        tokens,
    };
};

export const fetchAuthUserRequest = () => ({
    type: FETCH_AUTH_USER_REQUEST,
});

export const fetchAuthUserSuccess = user => ({
    type: FETCH_AUTH_USER_SUCCESS,
    user,
});

export const fetchAuthUserFailure = error => ({
    type: FETCH_AUTH_USER_FAILURE,
    error,
});
