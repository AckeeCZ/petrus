import { createApiActions } from '@ackee/redux-utils';
import { actionType } from 'services/utils';

export type FetchUserRequestPayload = void;

// TODO:
export type FetchUserSuccessPayload = any;

// TODO:
export type FetchUserFailurePayload = any;

const ACTION_TYPE_PREFIX = actionType('FETCH_USER');

export const fetchUser = createApiActions<
    typeof ACTION_TYPE_PREFIX,
    FetchUserRequestPayload,
    FetchUserSuccessPayload,
    FetchUserFailurePayload
>(ACTION_TYPE_PREFIX);
