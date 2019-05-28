import types from './types';

export const authSessionStart = () => ({
    type: types.AUTH_SESSION_START,
});

export const authSessionEnd = () => ({
    type: types.AUTH_SESSION_END,
});

export const authSessionPause = () => ({
    type: types.AUTH_SESSION_PAUSE,
});

export const authSessionResume = () => ({
    type: types.AUTH_SESSION_RESUME,
});
