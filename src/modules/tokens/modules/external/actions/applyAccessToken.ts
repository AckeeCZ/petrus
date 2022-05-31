import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';
import type { PetrusTokens } from 'types';

const types = {
    APPLY_ACCESS_TOKEN_REQUEST: actionType('APPLY_ACCESS_TOKEN_REQUEST'),
    APPLY_ACCESS_TOKEN_RESOLVE: actionType('APPLY_ACCESS_TOKEN_RESOLVE'),
    UNAPPLY_ACCESS_TOKEN_REQUEST: actionType('UNAPPLY_ACCESS_TOKEN_REQUEST'),
    UNAPPLY_ACCESS_TOKEN_RESOLVE: actionType('UNAPPLY_ACCESS_TOKEN_RESOLVE'),
} as const;

export const applyAccessTokenRequest = createAction<
    PetrusTokens['accessToken'],
    typeof types['APPLY_ACCESS_TOKEN_REQUEST']
>(types.APPLY_ACCESS_TOKEN_REQUEST);

export const applyAccessTokenResolve = createAction<void, typeof types['APPLY_ACCESS_TOKEN_RESOLVE']>(
    types.APPLY_ACCESS_TOKEN_RESOLVE,
);

export const unapplyAccessTokenRequest = createAction<void, typeof types['UNAPPLY_ACCESS_TOKEN_REQUEST']>(
    types.UNAPPLY_ACCESS_TOKEN_REQUEST,
);

export const unapplyAccessTokenResolve = createAction<void, typeof types['UNAPPLY_ACCESS_TOKEN_RESOLVE']>(
    types.UNAPPLY_ACCESS_TOKEN_RESOLVE,
);
