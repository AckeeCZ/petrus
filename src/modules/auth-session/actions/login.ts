import { createApiActions } from '@ackee/redux-utils';
import { actionType } from 'services/utils';

export type LoginRequestPayload = any; // credentials

// TODO:
export type LoginSuccessPayload = any;

// TODO:
export type LoginFailurePayload = any; // error

const ACTION_TYPE_PREFIX = actionType('LOGIN');

export const login = createApiActions<
    typeof ACTION_TYPE_PREFIX,
    LoginRequestPayload,
    LoginSuccessPayload,
    LoginFailurePayload
>(ACTION_TYPE_PREFIX);
