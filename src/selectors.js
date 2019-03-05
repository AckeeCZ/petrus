import config from './sagas/config';

export const authTokens = state => {
    return state[config.options.reducerKey].tokens;
};
export const isRefreshing = state => {
    return state[config.options.reducerKey].isRefreshing;
};
export const authUser = state => {
    return state[config.options.reducerKey].user;
};
export const isLoggedIn = state => {
    return state[config.options.reducerKey].isLoggedIn;
};
export const loginErrors = state => {
    return state[config.options.reducerKey].loginError;
};
export const isLoggingIn = state => {
    return state[config.options.reducerKey].isLoggingIn;
};

export const isUserFetching = state => state[config.options.reducerKey].isUserFetching;

export const triedToRetrieveTokens = state => state[config.options.reducerKey].triedToRetrieveTokens;

export const tokensPersistence = state => state[config.options.reducerKey].tokensPersistence;

export const isRetrievingTokens = state => state[config.options.reducerKey].isRetrievingTokens;

export const accessTokenIsAvailable = state => {
    const { tokens } = state[config.options.reducerKey];

    return Boolean(tokens && tokens.accessToken && tokens.accessToken.token);
};
