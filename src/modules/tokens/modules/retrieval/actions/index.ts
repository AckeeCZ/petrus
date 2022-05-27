import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';

const types = {
    RETRIEVE_TOKENS_REQUEST: actionType('RETRIEVE_TOKENS_REQUEST'),
    RETRIEVE_TOKENS_RESOLVE: actionType('RETRIEVE_TOKENS_RESOLVE'),
} as const;

export const retrieveTokensRequest = createAction<void, typeof types['RETRIEVE_TOKENS_REQUEST']>(
    types.RETRIEVE_TOKENS_REQUEST,
);

export const retrieveTokensResolve = createAction<boolean, typeof types['RETRIEVE_TOKENS_RESOLVE']>(
    types.RETRIEVE_TOKENS_RESOLVE,
);
