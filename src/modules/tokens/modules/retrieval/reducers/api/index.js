import { apiKeys } from 'constants/index';

import retrieveTokens from './retrieveTokens';

export default {
    [apiKeys.RETRIEVE_TOKENS]: retrieveTokens,
};
