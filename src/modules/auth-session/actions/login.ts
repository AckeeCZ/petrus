import { createApiActions } from '@ackee/redux-utils';
import { actionType } from 'services/utils';
import type { PetrusCredentials } from 'types';

export type LoginRequestPayload = PetrusCredentials;

export type LoginSuccessPayload = void;

export type LoginFailurePayload = Error;

const ACTION_TYPE_PREFIX = actionType('LOGIN');

/**
 * @category Redux Action Creator
 */
export const login = createApiActions<
    typeof ACTION_TYPE_PREFIX,
    LoginRequestPayload,
    LoginSuccessPayload,
    LoginFailurePayload
>(ACTION_TYPE_PREFIX);
