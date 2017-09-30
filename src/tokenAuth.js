import { takeEvery, call, put, select, take } from 'redux-saga/effects';

const logger = console;

const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGIN_SUCCESS = 'AUTH_LOGIN_SUCCESS';
export const AUTH_LOGIN_FAILURE = 'AUTH_LOGIN_FAILURE';

const AUTH_LOGOUT = 'AUTH_LOGOUT';

const SET_AUTH_TOKENS = 'SET_AUTH_TOKENS';

const AUTH_REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN';
const AUTH_REFRESH_TOKEN_SUCCESS = 'AUTH_REFRESH_TOKEN_SUCCESS';
const AUTH_REFRESH_TOKEN_FAILURE = 'AUTH_REFRESH_TOKEN_FAILURE';


const reducerName = 'auth';

const accessToken = (state) => {
    return state[reducerName].tokens.accessToken;
};
const refreshToken = (state) => {
    return state[reducerName].tokens.refreshToken;
};
const authUser = (state) => {
    return state[reducerName].user;
};
const isRefreshing = (state) => {
    return state[reducerName].isRefreshing;
};
const isLoggedIn = (state) => {
    return state[reducerName].isLoggedIn;
};
export const loginErrors = (state) => {
    return state[reducerName].loginError;
};
export const isLoggingIn = (state) => {
    return state[reducerName].loggingIn;
};

let remoteLogin = null;
let remoteRefreshTokens = null;

export const configure = (loginFn, refreshTokensFn) => {
    remoteLogin = loginFn;
    remoteRefreshTokens = refreshTokensFn;
};

// -----------------------------------------------------------------------------

export const login = (credentials) => {
    return {
        type: AUTH_LOGIN,
        credentials,
    };
};

const stopLogin = (error, user) => {
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

const setTokens = (tokens) => ({
    type: SET_AUTH_TOKENS,
    tokens,
});

const startTokenRefresh = (refreshToken) => ({
    type: AUTH_REFRESH_TOKEN,
    refreshToken,
});

const stopTokenRefresh = (error, tokens = {}) => {
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

export const saga = function* () {
    const handleLogin = function*(action) {
        try {
            const { user, tokens }
                = yield call(() => remoteLogin(action.credentials));

            yield put(stopLogin(null, user));
            yield put(setTokens(tokens));

        } catch (e) {
            yield put(stopLogin(e));
            logger.error(`Failed to login user: ${e.message}`);
        }
    }
    yield takeEvery(AUTH_LOGIN, handleLogin);
};

const processTokenRefresh = function*() {
    const rToken = yield select(refreshToken)
    yield put(startTokenRefresh(rToken));
    try {
        const tokens = yield remoteRefreshTokens(rToken);
        yield put(stopTokenRefresh(null, tokens));
        yield put(setTokens(tokens));
    } catch (refreshError) {
        yield put(stopTokenRefresh(refreshError));
        yield put(logout());
    }
}

export const authorizedFn = function*(detectShouldRefresh, fn) {
    const processFn = function*() {
        const aToken = yield select(accessToken);
        const rToken = yield select(refreshToken);
        const user = yield select(authUser);
        return yield call(() => fn({
            accessToken: aToken,
            refreshToken: rToken,
            user,
        }));
    }

    // If token refreshing is being processed, wait for it to finish
    if (yield select(isRefreshing)) {
        yield take([AUTH_REFRESH_TOKEN_FAILURE, AUTH_REFRESH_TOKEN_SUCCESS]);
    }

    try {
        const result = yield processFn();
        if (detectShouldRefresh(null, result)) {
            yield processTokenRefresh();
            if (yield select(isLoggedIn)) {
                return yield processFn();
            }
        }
        return result;
    } catch(e) {
        if (detectShouldRefresh(e, null)) {
            yield processTokenRefresh();
            if (yield select(isLoggedIn)) {
                return yield processFn();
            }
        }
        // None of my business, pass error along
        throw e;
    }
}

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
