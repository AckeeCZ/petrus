import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';

const types = {
    RETRIEVE_TOKENS_REQUEST: actionType('RETRIEVE_TOKENS_REQUEST'),
    RETRIEVE_TOKENS_RESOLVE: actionType('RETRIEVE_TOKENS_RESOLVE'),
} as const;

/**
 * @ignore
 */
export const retrieveTokensRequest = createAction<void, typeof types['RETRIEVE_TOKENS_REQUEST']>(
    types.RETRIEVE_TOKENS_REQUEST,
);

/**
 * @ignore
 */
export const retrieveTokensResolve = createAction<boolean, typeof types['RETRIEVE_TOKENS_RESOLVE']>(
    types.RETRIEVE_TOKENS_RESOLVE,
);

/**
 * This action is triggered right before tokens retrieval from a local storage begins.
 * @category Redux Action Type
 */
export const RETRIEVE_TOKENS_REQUEST = retrieveTokensRequest.type;

/**
 * This action contains `payload.tokensRetrieved` flag with the tokens retrieval result.
 * @category Redux Action Type
 */
export const RETRIEVE_TOKENS_RESOLVE = retrieveTokensResolve.type;
