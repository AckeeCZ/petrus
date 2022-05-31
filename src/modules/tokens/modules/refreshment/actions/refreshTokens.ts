import { createApiActions } from '@ackee/redux-utils';
import { actionType } from 'services/utils';
import type { PetrusTokens } from 'types';

const ACTION_TYPE = actionType('REFRESH_TOKENS');

type RefreshTokensRequestPayload = PetrusTokens | undefined;

type RefreshTokensSuccessPayload = void;

type RefreshTokensFailurePayload = Error;

export const refreshTokens = createApiActions<
    typeof ACTION_TYPE,
    RefreshTokensRequestPayload,
    RefreshTokensSuccessPayload,
    RefreshTokensFailurePayload
>(ACTION_TYPE);
