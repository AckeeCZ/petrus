import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';

const types = {
    CHECK_ACCESS_TOKEN_EXPIRATION: actionType('CHECK_ACCESS_TOKEN_EXPIRATION'),
} as const;

/**
 * @category Redux Action Creator
 */
export const checkAccessTokenExpiration = createAction<void, typeof types['CHECK_ACCESS_TOKEN_EXPIRATION']>(
    types.CHECK_ACCESS_TOKEN_EXPIRATION,
);
