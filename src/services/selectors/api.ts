import { config } from 'config';
import type { ApiKey } from 'constants/index';
import type { AppRootState } from 'types';

/**
 * @category Redux Selector
 *
 * @example
 * ```ts
 * import { select } from 'redux-saga/effects';
 * import { createSelector } from 'reselect';
 * import { apiSelector } from '@ackee/petrus';
 *
 * const fetchUserSelector = createSelector(apiSelector, api => api.fetchUser);
 *
 * function* selectFetchUser() {
 *     const { inProgress, success, error } = yield select(fetchUserSelector);
 *     // ...
 * }
 * ```
 */
export const apiSelector = (state: AppRootState, apiKey: ApiKey) => {
    const { api } = config.selector(state);
    return api[apiKey];
};

export const apiSelectorFactory = (apiKey: ApiKey) => (state: AppRootState) => {
    return apiSelector(state, apiKey);
};
