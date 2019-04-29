import types from './types';

export { types };
export * from './fetchUser';
export * from './login';
export * from './logout';

// TODO:
export const setUserWithTokens = (user, tokens) => ({
    type: types.SET_USER_WITH_TOKENS,
    payload: {
        user,
        tokens,
    },
});
