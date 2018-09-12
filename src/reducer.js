import {
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE,
    AUTH_LOGOUT,
    SET_AUTH_TOKENS,
    AUTH_REFRESH_TOKEN,
    AUTH_REFRESH_TOKEN_FAILURE,
    AUTH_REFRESH_TOKEN_SUCCESS,
} from './actionType';

const initialState = {
    user: null,
    isLoggedIn: false,
    isLoggingIn: false,
    loginError: null,
    tokens: {},
    isRefreshing: false,
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
        case AUTH_REFRESH_TOKEN: {
            return {
                ...state,
                isRefreshing: true,
            };
        }
        case AUTH_REFRESH_TOKEN_SUCCESS: {
            return {
                ...state,
                isRefreshing: false,
                tokens: {
                    ...state.tokens,
                    ...action.tokens,
                },
            };
        }
        case AUTH_REFRESH_TOKEN_FAILURE: {
            return {
                ...state,
                isRefreshing: false,
            };
        }
        default:
            return state;
    }
};
