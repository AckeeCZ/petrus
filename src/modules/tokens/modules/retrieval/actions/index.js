import types from './types';

export const retrieveTokensRequest = () => ({
    type: types.RETRIEVE_TOKENS_REQUEST,
});

export const retrieveTokensResolve = tokensRetrieved => ({
    type: types.RETRIEVE_TOKENS_RESOLVE,
    payload: {
        tokensRetrieved,
    },
});

export { types };
