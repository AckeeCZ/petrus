import { createApiActions } from '@ackee/redux-utils';
import { actionType } from 'services/utils';

export type LogoutRequestPayload = void;

export type LogoutSuccessPayload = void;

export type LogoutFailurePayload = Error;

const ACTION_TYPE_PREFIX = actionType('LOGOUT');

/**
 * @category Redux Action Creator
 */
export const logout = createApiActions<
    typeof ACTION_TYPE_PREFIX,
    LogoutRequestPayload,
    LogoutSuccessPayload,
    LogoutFailurePayload
>(ACTION_TYPE_PREFIX);
