import types from './statusTypes';

// A status is function returning a plain object
// used by redux saga channels for communication

// NOTE: Any better name is very much welcomed.

export const accessTokenAvailable = accessToken => ({
    type: types.ACCESS_TOKEN_AVAILABLE,
    payload: accessToken,
});

export const accessTokenUnavailable = () => ({
    type: types.ACCESS_TOKEN_UNAVAILABLE,
});

export const authSessionStart = () => ({
    type: types.AUTH_SESSION_START,
});

export const authSessionEnd = () => ({
    type: types.AUTH_SESSION_END,
});

export const authSessionPaused = () => ({
    type: types.AUTH_SESSION_PAUSED,
});

export const authSessionResume = () => ({
    type: types.AUTH_SESSION_RESUME,
});
