import { apiSelectorFactory } from 'services/selectors';
import { ApiKeys } from 'constants/index';

export const loginSelector = apiSelectorFactory(ApiKeys.LOGIN);
