import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';

const types = {
    AUTH_SESSION_START: actionType('AUTH_SESSION_START'),
    AUTH_SESSION_END: actionType('AUTH_SESSION_END'),
    AUTH_SESSION_PAUSE: actionType('AUTH_SESSION_PAUSE'),
    AUTH_SESSION_RESUME: actionType('AUTH_SESSION_RESUME'),
} as const;

/**
 * @ignore
 */
export const authSessionStart = createAction<void, typeof types['AUTH_SESSION_START']>(types.AUTH_SESSION_START);

/**
 * @ignore
 */
export const authSessionEnd = createAction<void, typeof types['AUTH_SESSION_END']>(types.AUTH_SESSION_END);

/**
 * @ignore
 */
export const authSessionPause = createAction<void, typeof types['AUTH_SESSION_PAUSE']>(types.AUTH_SESSION_PAUSE);

/**
 * @ignore
 */
export const authSessionResume = createAction<void, typeof types['AUTH_SESSION_RESUME']>(types.AUTH_SESSION_RESUME);

/**
 * @category Redux Action Type
 */
export const AUTH_SESSION_START = authSessionStart.type;

/**
 * @category Redux Action Type
 */
export const AUTH_SESSION_END = authSessionEnd.type;

/**
 * @category Redux Action Type
 */
export const AUTH_SESSION_PAUSE = authSessionPause.type;

/**
 * @category Redux Action Type
 */
export const AUTH_SESSION_RESUME = authSessionResume.type;
