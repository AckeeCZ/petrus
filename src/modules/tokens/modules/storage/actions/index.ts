import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';
import type { TokensPersistence } from '../constants';

const types = {
    SET_TOKENS_PERSISTENCE: actionType('SET_TOKENS_PERSISTENCE'),
} as const;

/**
 * @category Redux Action Creator
 *
 * @example
 * __1. Override the default `tokensPersistence` value:__
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
 * @example
 * __2. Set tokens persistence dynamically:__
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
