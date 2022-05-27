import { getReducerKey } from 'config';
import type { ApiKeys } from 'constants/index';
import type { PetrusRootState } from 'services/reducers';

// TODO:
export const apiSelector = (state: any, apiKey: ApiKeys) => {
    const { api } = state[getReducerKey()];

    return apiKey ? api[apiKey] : api;
};

export const apiSelectorFactory = (apiKey: ApiKeys) => (state: PetrusRootState) => apiSelector(state, apiKey);
