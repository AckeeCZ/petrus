import { createApiActions } from '@ackee/redux-utils';

export type FetchUserRequestPayload = void;

// TODO:
export type FetchUserSuccessPayload = any;

// TODO:
export type FetchUserFailurePayload = any;

export const fetchUser = createApiActions<
    'FETCH_USER',
    FetchUserRequestPayload,
    FetchUserSuccessPayload,
    FetchUserFailurePayload
>('FETCH_USER');
