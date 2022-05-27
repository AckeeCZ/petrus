import { config } from 'config';
import type { ApiKeys } from 'constants/index';

export const apiSelector = <AppState>(state: AppState, apiKey: ApiKeys) => {
    const { api } = config.selector<AppState>(state);
    return api[apiKey];
};

export const apiSelectorFactory =
    (apiKey: ApiKeys) =>
    <AppState>(state: AppState) => {
        return apiSelector(state, apiKey);
    };
