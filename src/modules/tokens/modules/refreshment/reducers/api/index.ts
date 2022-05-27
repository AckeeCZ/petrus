import { ApiKeys } from 'constants/index';

import refreshTokens from './refreshTokens';

export default {
    [ApiKeys.REFRESH_TOKENS]: refreshTokens,
} as const;
