import { config } from 'config';
import type { ApiKeys } from 'constants/index';

/**
 * @category Redux Selector
 *
 * @example
 * ```ts
 * import { select } from 'redux-saga/effects';
 * import { createSelector } from 'reselect';
 * import { apiSelector, ApiKeys } from '@ackee/petrus';
 *
 * const fetchUserSelector = createSelector(apiSelector, api => api[ApiKeys.FETCH_USER]);
 *
 * function* selectFetchUser() {
 *     const { inProgress, success, error } = yield select(fetchUserSelector);
 *     // ...
 * }
 * ```
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
