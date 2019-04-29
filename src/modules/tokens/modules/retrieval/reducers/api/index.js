import { apiKeys } from 'Consts';

import retrieveTokens from './retrieveTokens';

export default {
    [apiKeys.RETRIEVE_TOKENS]: retrieveTokens,
};
