import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';

const types = {
    AUTH_SESSION_START: actionType('AUTH_SESSION_START'),
    AUTH_SESSION_END: actionType('AUTH_SESSION_END'),
    AUTH_SESSION_PAUSE: actionType('AUTH_SESSION_PAUSE'),
    AUTH_SESSION_RESUME: actionType('AUTH_SESSION_RESUME'),
} as const;

/**
 * @category Redux Action Creator
 */
export const authSessionStart = createAction<void, typeof types['AUTH_SESSION_START']>(types.AUTH_SESSION_START);

/**
 * @category Redux Action Creator
 */
export const authSessionEnd = createAction<void, typeof types['AUTH_SESSION_END']>(types.AUTH_SESSION_END);

/**
 * @category Redux Action Creator
 */
export const authSessionPause = createAction<void, typeof types['AUTH_SESSION_PAUSE']>(types.AUTH_SESSION_PAUSE);

/**
 * @category Redux Action Creator
 */
export const authSessionResume = createAction<void, typeof types['AUTH_SESSION_RESUME']>(types.AUTH_SESSION_RESUME);
