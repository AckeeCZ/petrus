import { apiKeys } from 'constants/index';

import refreshTokens from './refreshTokens';

export default {
    [apiKeys.REFRESH_TOKENS]: refreshTokens,
} as const;
