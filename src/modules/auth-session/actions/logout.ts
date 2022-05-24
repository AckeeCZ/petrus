import { createApiActions } from '@ackee/redux-utils';
import { actionType } from 'services/utils';

export type LogoutRequestPayload = void;

// TODO:
export type LogoutSuccessPayload = any;

// TODO:
export type LogoutFailurePayload = any;

const ACTION_TYPE_PREFIX = actionType('LOGOUT');

export const logout = createApiActions<
    typeof ACTION_TYPE_PREFIX,
    LogoutRequestPayload,
    LogoutSuccessPayload,
    LogoutFailurePayload
>(ACTION_TYPE_PREFIX);
