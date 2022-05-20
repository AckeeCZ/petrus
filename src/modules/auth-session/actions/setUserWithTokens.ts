import { createAction } from '@reduxjs/toolkit';

// TODO: add user & tokens type
export const setUserWithTokens = createAction('SET_USER_WITH_TOKENS', (user: any, tokens: any) => ({
    payload: {
        user,
        tokens,
    },
}));
