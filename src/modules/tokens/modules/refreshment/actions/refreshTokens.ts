import { createApiActions } from '@ackee/redux-utils';
import { actionType } from 'services/utils';

const ACTION_TYPE = actionType('REFRESH_TOKENS');

// TODO:
type RefreshTokensRequestPayload = any;

type RefreshTokensSuccessPayload = void;

// TODO:
type RefreshTokensFailurePayload = Error;

export const refreshTokens = createApiActions<
    typeof ACTION_TYPE,
    RefreshTokensRequestPayload,
    RefreshTokensSuccessPayload,
    RefreshTokensFailurePayload
>(ACTION_TYPE);
