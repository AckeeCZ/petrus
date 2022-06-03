import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';
import type { TokensPersistence } from '../constants';

const types = {
    SET_TOKENS_PERSISTENCE: actionType('SET_TOKENS_PERSISTENCE'),
} as const;

/**
 * @category Redux Action Creator
 *
 * ### Override the default `tokensPersistence` value
 * @example
 * ```ts
 * import { configure, TokensPersistence } from '@ackee/petrus';
 *
 * const { saga, reducer } = configure({
 *     // ...
 *     initialState: {
 *         tokensPersistence: TokensPersistence.NONE,
 *     },
 * });
 * ```
 *
 * ### Set tokens persistence dynamically
 * @example
 * ```ts
 * import { put } from 'redux-saga/effects';
 * import { setTokensPersistence, TokensPersistence } from '@ackee/petrus';
 *
 * function* disableTokensPersistence() {
 *     yield put(setTokensPersistence(TokensPersistence.NONE));
 * }
 *
 * function* enableTokensPersistence() {
 *     yield put(setTokensPersistence(TokensPersistence.LOCAL));
 * }
 * ```
 */
export const setTokensPersistence = createAction<TokensPersistence, typeof types['SET_TOKENS_PERSISTENCE']>(
    types.SET_TOKENS_PERSISTENCE,
);
