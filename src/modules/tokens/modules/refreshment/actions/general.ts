import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';

const types = {
    CHECK_ACCESS_TOKEN_EXPIRATION: actionType('CHECK_ACCESS_TOKEN_EXPIRATION'),
} as const;

/**
 * This action will trigger a saga that checks if the access token is expired. If it's, then the access token is refreshed.
 * @category Redux Action Creator
 *
 * @example
 * ```ts
 * import { put } from 'redux-saga/effects';
 * import { checkAccessTokenExpiration } from '@ackee/petrus';
 *
 * export function* saga() {
 *   yield put(checkAccessTokenExpiration());
 * }
 * ```
 */
export const checkAccessTokenExpiration = createAction<void, typeof types['CHECK_ACCESS_TOKEN_EXPIRATION']>(
    types.CHECK_ACCESS_TOKEN_EXPIRATION,
);
