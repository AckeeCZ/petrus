import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';

// TODO: add user & tokens type
export const setUserWithTokens = createAction(actionType(`SET_USER_WITH_TOKENS`), (user: any, tokens: any) => ({
    payload: { user, tokens },
}));
