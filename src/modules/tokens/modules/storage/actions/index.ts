import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';
import type { TokensPersistence } from '../constants';

const types = {
    SET_TOKENS_PERSISTENCE: actionType('SET_TOKENS_PERSISTENCE'),
} as const;

export const setTokensPersistence = createAction<TokensPersistence, typeof types['SET_TOKENS_PERSISTENCE']>(
    types.SET_TOKENS_PERSISTENCE,
);
