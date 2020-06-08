import { apiSelectorFactory } from 'services/selectors';
import { apiKeys } from 'constants/index';

export const loginSelector = apiSelectorFactory(apiKeys.LOGIN);
