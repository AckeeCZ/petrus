import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';

const types = {
    ACCESS_TOKEN_AVAILABLE: actionType('ACCESS_TOKEN_AVAILABLE'),
    ACCESS_TOKEN_UNAVAILABLE: actionType('ACCESS_TOKEN_UNAVAILABLE'),
} as const;

export const accessTokenAvailable = createAction<string, typeof types['ACCESS_TOKEN_AVAILABLE']>(
    types.ACCESS_TOKEN_AVAILABLE,
);

export const accessTokenUnavailable = createAction<void, typeof types['ACCESS_TOKEN_UNAVAILABLE']>(
    types.ACCESS_TOKEN_UNAVAILABLE,
);
