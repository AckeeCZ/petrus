import { apiSelectorFactory } from 'Services/selectors';
import { apiKeys } from 'Consts';

export const loginSelector = apiSelectorFactory(apiKeys.LOGIN);
