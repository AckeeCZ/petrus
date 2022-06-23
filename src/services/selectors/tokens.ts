import type { AppRootState } from 'types';
import { entitiesSelector } from './entities';

/**
 * @category Redux Selector
 */
export const tokensSelector = (state: AppRootState) => entitiesSelector(state).tokens;

/**
 * @category Redux Selector
 */
export const tokensPersistenceSelector = (state: AppRootState) => entitiesSelector(state).tokensPersistence;

/**
 * @category Redux Selector
 */
export const accessTokenSelector = (state: AppRootState) => tokensSelector(state)?.accessToken ?? null;
