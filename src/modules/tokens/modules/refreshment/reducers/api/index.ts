import { ApiKeys } from 'constants/index';

import refreshTokens from './refreshTokens';

export const tokensRefreshmentApiReducers = {
    [ApiKeys.REFRESH_TOKENS]: refreshTokens,
} as const;
