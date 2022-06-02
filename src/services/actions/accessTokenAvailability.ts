import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';
import type { PetrusTokens } from 'types';

const types = {
    ACCESS_TOKEN_AVAILABLE: actionType('ACCESS_TOKEN_AVAILABLE'),
    ACCESS_TOKEN_UNAVAILABLE: actionType('ACCESS_TOKEN_UNAVAILABLE'),
} as const;

/**
 * @ignore
 */
export const accessTokenAvailable = createAction<PetrusTokens['accessToken'], typeof types['ACCESS_TOKEN_AVAILABLE']>(
    types.ACCESS_TOKEN_AVAILABLE,
);

/**
 * @ignore
 */
export const accessTokenUnavailable = createAction<void, typeof types['ACCESS_TOKEN_UNAVAILABLE']>(
    types.ACCESS_TOKEN_UNAVAILABLE,
);

/**
 * When the access token becomes available, this action is dispatched (on LOGIN_SUCCESS and REFRESH_TOKENS_SUCCESS).
 * @category Redux Action Type
 */
export const ACCESS_TOKEN_AVAILABLE = accessTokenAvailable.type;

/**
 * Access token becomes unavailable on logout or when tokens refreshment start.
 * It's guaranteed that the `ACCESS_TOKEN_UNAVAILABLE` action will be dispatched only once after `ACCESS_TOKEN_AVAILABLE`.
 * @category Redux Action Type
 */
export const ACCESS_TOKEN_UNAVAILABLE = accessTokenUnavailable.type;
