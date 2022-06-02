import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';
import type { PetrusTokens, PetrusUser } from 'types';

/**
 * @category Redux Action Creator
 */
export const setUserWithTokens = createAction(
    actionType(`SET_USER_WITH_TOKENS`),
    (user: PetrusUser, tokens: PetrusTokens) => ({
        payload: { user, tokens },
    }),
);
