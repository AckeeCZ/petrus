import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    SET_AUTH_TOKENS,
    AUTH_REFRESH_TOKEN,
    AUTH_REFRESH_TOKEN_FAILURE,
    AUTH_REFRESH_TOKEN_SUCCESS,
    FETCH_AUTH_USER_REQUEST,
    FETCH_AUTH_USER_SUCCESS,
    FETCH_AUTH_USER_FAILURE,
} from './actionType';

const initialState = {
    user: null,
    isLoggedIn: false,
    isLoggingIn: false,
    loginError: null,
    tokens: {},
    isRefreshing: false,
    isUserFetching: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN:
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: true,
                loginError: null,
            };

        case AUTH_LOGIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                isLoggingIn: false,
                user: action.user,
                loginError: null,
            };

        case AUTH_LOGIN_FAILURE:
            return {
                ...state,
                isLoggedIn: false,
                isLoggingIn: false,
                user: null,
                loginError: action.error,
            };

        case SET_AUTH_TOKENS:
            return {
                ...state,
                tokens: {
                    ...state.tokens,
                    ...action.tokens,
                },
            };

        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                tokens: {},
            };

        case AUTH_REFRESH_TOKEN:
            return {
                ...state,
                isRefreshing: true,
            };

        case AUTH_REFRESH_TOKEN_SUCCESS:
            return {
                ...state,
                isRefreshing: false,
                tokens: {
                    ...state.tokens,
                    ...action.tokens,
                },
            };

        case AUTH_REFRESH_TOKEN_FAILURE:
            return {
                ...state,
                isRefreshing: false,
            };

        case FETCH_AUTH_USER_REQUEST:
            return {
                ...state,
                isUserFetching: true,
            };

        case FETCH_AUTH_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                isUserFetching: false,
            };

        case FETCH_AUTH_USER_FAILURE:
            return {
                ...state,
                isUserFetching: false,
            };

        default:
            return state;
    }
};
