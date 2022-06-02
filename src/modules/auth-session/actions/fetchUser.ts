import { createApiActions } from '@ackee/redux-utils';
import { actionType } from 'services/utils';
import type { PetrusUser } from 'types';

export type FetchUserRequestPayload = void;

export type FetchUserSuccessPayload = PetrusUser;

export type FetchUserFailurePayload = Error;

const ACTION_TYPE_PREFIX = actionType('FETCH_USER');

export const fetchUser = createApiActions<
    typeof ACTION_TYPE_PREFIX,
    FetchUserRequestPayload,
    FetchUserSuccessPayload,
    FetchUserFailurePayload
>(ACTION_TYPE_PREFIX);
