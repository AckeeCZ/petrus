import { createApiActions } from '@ackee/redux-utils';

export type LoginRequestPayload = any; // credentials

// TODO:
export type LoginSuccessPayload = any;

// TODO:
export type LoginFailurePayload = any; // error

export const login = createApiActions<'LOGIN', LoginRequestPayload, LoginSuccessPayload, LoginFailurePayload>('LOGIN');
