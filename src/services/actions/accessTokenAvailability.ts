import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';
import type { PetrusTokens } from 'types';

const types = {
    ACCESS_TOKEN_AVAILABLE: actionType('ACCESS_TOKEN_AVAILABLE'),
    ACCESS_TOKEN_UNAVAILABLE: actionType('ACCESS_TOKEN_UNAVAILABLE'),
} as const;

/**
 * @category Redux Action Creator
 */
export const accessTokenAvailable = createAction<PetrusTokens['accessToken'], typeof types['ACCESS_TOKEN_AVAILABLE']>(
    types.ACCESS_TOKEN_AVAILABLE,
);

/**
 * @category Redux Action Creator
 */
export const accessTokenUnavailable = createAction<void, typeof types['ACCESS_TOKEN_UNAVAILABLE']>(
    types.ACCESS_TOKEN_UNAVAILABLE,
);
