import { ApiKeys } from 'constants/index';

import retrieveTokens from './retrieveTokens';

export default {
    [ApiKeys.RETRIEVE_TOKENS]: retrieveTokens,
} as const;
