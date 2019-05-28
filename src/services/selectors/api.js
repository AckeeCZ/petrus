import { getReducerKey } from 'Config';

export const apiSelector = (state, apiKey) => state[getReducerKey()].api[apiKey];

export const apiSelectorFactory = apiKey => state => apiSelector(state, apiKey);
