import { createApiActions } from '@ackee/redux-utils';

export type LogoutRequestPayload = void;

// TODO:
export type LogoutSuccessPayload = any;

// TODO:
export type LogoutFailurePayload = any;

export const logout = createApiActions<'LOGOUT', LogoutRequestPayload, LogoutSuccessPayload, LogoutFailurePayload>(
    'LOGOUT',
);
