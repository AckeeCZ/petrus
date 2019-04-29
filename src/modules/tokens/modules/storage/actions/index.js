import types from './types';

export const setTokensPersistence = persistence => ({
    type: types.SET_TOKENS_PERSISTENCE,
    persistence,
});

export { types };
