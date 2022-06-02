import { config } from 'config';
import type { ApiKeys } from 'constants/index';

/**
 * @category Redux Selector
 */
export const apiSelector = <AppState>(state: AppState, apiKey: ApiKeys) => {
    const { api } = config.selector(state);
    return api[apiKey];
};

export const apiSelectorFactory =
    (apiKey: ApiKeys) =>
    <AppState>(state: AppState) => {
        return apiSelector(state, apiKey);
    };
