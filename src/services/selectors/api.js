import { getReducerKey } from 'Config';

export const apiSelector = (state, apiKey) => {
    const { api } = state[getReducerKey()];

    return apiKey ? api[apiKey] : api;
};

export const apiSelectorFactory = apiKey => state => apiSelector(state, apiKey);
