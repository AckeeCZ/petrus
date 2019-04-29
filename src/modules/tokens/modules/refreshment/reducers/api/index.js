import { apiKeys } from 'Consts';

import refreshTokens from './refreshTokens';

export default {
    [apiKeys.REFRESH_TOKENS]: refreshTokens,
};
