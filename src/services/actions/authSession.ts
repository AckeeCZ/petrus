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
 * Once a user has been successfully logged in, this action is dispatched. It's guaranteed that `AUTH_SESSION_END` must be triggered first before another `AUTH_SESSION_START` trigger.
 *
 * @category Redux Action Type
 *
 * @example
 * ```ts
 * import { put } from 'redux-saga/effects';
 * import { AUTH_SESSION_START } from '@ackee/petrus';
 *
 * function* watchAuthSession() {
 *     yield takeEvery(AUTH_SESSION_START, function* (action) {
 *         // ...
 *     });
 * }
 * ```
 */
export const AUTH_SESSION_START = authSessionStart.type;

/**
 * This action is triggered on the access token refreshment start.
 *
 * @category Redux Action Type
 */
export const AUTH_SESSION_PAUSE = authSessionPause.type;

/**
 * If access token refreshment was successful, `AUTH_SESSION_RESUME` is triggered. It's guaranteed it will be dispatched only after `AUTH_SESSION_PAUSE` action.
 *
 * @category Redux Action Type
 */
export const AUTH_SESSION_RESUME = authSessionResume.type;

/**
 * The `AUTH_SESSION_END` action is triggered on `AUTH_LOGOUT_SUCCESS` or `REFRESH_TOKENS_FAILURE`.
 *
 * @category Redux Action Type
 */
export const AUTH_SESSION_END = authSessionEnd.type;
