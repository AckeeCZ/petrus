import { takeEvery, call, put, select, take } from 'redux-saga/effects';

const logger = console;

const AUTH_LOGIN = 'AUTH_LOGIN';
const SET_AUTH_LOGIN_ERRORS = 'SET_AUTH_LOGIN_ERRORS';
const SET_AUTH_USER = 'SET_AUTH_USER';
const SET_AUTH_TOKENS = 'SET_AUTH_TOKENS';
const AUTH_LOGOUT = 'AUTH_LOGOUT';
const AUTH_REFRESH_TOKEN = 'AUTH_REFRESH_TOKEN';
const AUTH_REFRESH_TOKEN_SUCCESS = 'AUTH_REFRESH_TOKEN_SUCCESS';
const AUTH_REFRESH_TOKEN_FAILED = 'AUTH_REFRESH_TOKEN_FAILED';
const AUTH_REFRESH_TOKEN_COMPLETED = 'AUTH_REFRESH_TOKEN_COMPLETED';

const reducerName = 'auth';

const accessToken = (state) => {
    return state[reducerName].accessToken;
};
const refreshToken = (state) => {
    return state[reducerName].refreshToken;
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

export const login = (credentials) => ({
    type: AUTH_LOGIN,
    credentials,
});

export const setLoginError = (e) => ({
    type: SET_AUTH_LOGIN_ERRORS,
    error: e,
})

export const logout = () => ({
    type: AUTH_LOGOUT,
});

const setAuthUser = (user) => ({
    type: SET_AUTH_USER,
    user,
});

const setTokens = ({ accessToken, refreshToken }) => ({
    type: SET_AUTH_TOKENS,
    accessToken,
    refreshToken,
});

const startTokenRefresh = (refreshToken) => ({
    type: AUTH_REFRESH_TOKEN,
});

const stopTokenRefresh = (error, tokens = {}) => {
    if (error) {
        return {
            type: AUTH_REFRESH_TOKEN_FAILED,
            error,
        };
    }
    return {
        type: AUTH_REFRESH_TOKEN_SUCCESS,
        ...tokens,
    };
}

const tokenRefreshStopped = () => ({
    type: AUTH_REFRESH_TOKEN_COMPLETED,
});

export const saga = function* () {
    const handleLogin = function*(action) {
        try {
            const { user, accessToken, refreshToken }
                = yield call(() => remoteLogin(action.credentials));

            if (user) {
                yield put(setAuthUser(user));
                yield put(setTokens({ accessToken, refreshToken }));
            }

        } catch (e) {
            yield put(setLoginError(e));
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
    } finally {
        yield put(tokenRefreshStopped())
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
        yield take(AUTH_REFRESH_TOKEN_COMPLETED);
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
    isLoggedIn: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    isRefreshing: false,
    loginError: null,
    loggingIn: false,
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN: {
            return {
                ...state,
                loggingIn: true,
            };
        }
        case SET_AUTH_TOKENS:
            return {
                ...state,
                accessToken: action.accessToken,
                refreshToken: action.refreshToken,
            };
        case SET_AUTH_USER:
            return {
                ...state,
                isLoggedIn: true,
                user: action.user,
                loginError: null,
                loggingIn: false,
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false,
                user: null,
                accessToken: null,
                refreshToken: null,
            };
        case AUTH_REFRESH_TOKEN: {
            return {
                ...state,
                isRefreshing: true,
            };
        }
        case AUTH_REFRESH_TOKEN_COMPLETED: {
            return {
                ...state,
                isRefreshing: false,
            };
        }
        case SET_AUTH_LOGIN_ERRORS: {
            return {
                ...state,
                loginError: action.error,
                loggingIn: false,
            };
        }
        default:
            return state;
    }
};
