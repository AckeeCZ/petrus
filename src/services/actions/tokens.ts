import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';
import type { PetrusTokens } from 'types';

const types = {
    SET_TOKENS: actionType('SET_TOKENS'),
    DELETE_TOKENS: actionType('SET_TOKENS'),
} as const;

export const setTokens = createAction<PetrusTokens, typeof types['SET_TOKENS']>(types.SET_TOKENS);

export const deleteTokens = createAction<void, typeof types['DELETE_TOKENS']>(types.DELETE_TOKENS);
