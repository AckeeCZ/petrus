import { createSelector } from 'reselect';
import { entitiesSelector } from './entities';

/**
 * @category Redux Selector
 */
export const tokensSelector = createSelector(entitiesSelector, entities => entities.tokens);

/**
 * @category Redux Selector
 */
export const tokensPersistenceSelector = createSelector(entitiesSelector, entities => entities.tokensPersistence);

/**
 * @category Redux Selector
 */
export const accessTokenSelector = createSelector(tokensSelector, tokens => tokens?.accessToken ?? null);
