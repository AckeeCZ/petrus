import { createSelector } from 'reselect';

import { apiKeys } from 'Consts';

import { entitiesSelector } from './entities';
import { apiSelectorFactory } from './api';

const refreshTokens = apiSelectorFactory(apiKeys.REFRESH_TOKENS);
const login = apiSelectorFactory(apiKeys.LOGIN);
const retrieveTokens = apiSelectorFactory(apiKeys.RETRIEVE_TOKENS);
const fetchUser = apiSelectorFactory(apiKeys.FETCH_USER);

export const authTokens = createSelector(
    entitiesSelector,
    entities => entities.tokens,
);
export const authUser = createSelector(
    entitiesSelector,
    entities => entities.user,
);

export const tokensPersistence = createSelector(
    entitiesSelector,
    entities => entities.tokensPersistence,
);

export const isRefreshing = createSelector(
    refreshTokens,
    api => api.isFetching,
);

export const isLoggedIn = createSelector(
    login,
    api => api.success,
);
export const loginErrors = createSelector(
    login,
    api => api.error,
);
export const isLoggingIn = createSelector(
    login,
    api => api.isFetching,
);

export const triedToRetrieveTokens = createSelector(
    retrieveTokens,
    api => api.success,
);

export const isRetrievingTokens = createSelector(
    retrieveTokens,
    api => api.isFetching,
);

export const accessTokenIsAvailable = createSelector(
    authTokens,
    tokens => Boolean(tokens && tokens.accessToken && tokens.accessToken.token),
);

export const isUserFetching = createSelector(
    fetchUser,
    api => api.isFetching,
);
