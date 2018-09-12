import { reducerName } from './config';

export const authTokens = state => {
    return state[reducerName].tokens;
};
export const isRefreshing = state => {
    return state[reducerName].isRefreshing;
};
export const authUser = state => {
    return state[reducerName].user;
};
export const isLoggedIn = state => {
    return state[reducerName].isLoggedIn;
};
export const loginErrors = state => {
    return state[reducerName].loginError;
};
export const isLoggingIn = state => {
    return state[reducerName].isLoggingIn;
};
