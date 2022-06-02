import { createApiActions } from '@ackee/redux-utils';
import { actionType } from 'services/utils';

export type LogoutRequestPayload = void;

export type LogoutSuccessPayload = void;

export type LogoutFailurePayload = Error;

const ACTION_TYPE_PREFIX = actionType('LOGOUT');

/**
 * @ignore
 */
export const logout = createApiActions<
    typeof ACTION_TYPE_PREFIX,
    LogoutRequestPayload,
    LogoutSuccessPayload,
    LogoutFailurePayload
>(ACTION_TYPE_PREFIX);

/**
 * Triggers a user logout flow: tokens are cleared from a persistent storage and any auth. data are cleared from the reducer.
 * @category Redux Action Creator
 * @example
 * ```ts
 *   import { put } from 'redux-saga/effects';
 *   import { logoutRequest } from '@ackee/petrus';
 *
 *   function* logoutSaga() {
 *       yield put(logoutRequest());
 *   }
 * ```
 */
export const logoutRequest = logout.request;
