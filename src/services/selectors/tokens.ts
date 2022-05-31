import { createSelector } from 'reselect';
import { entitiesSelector } from './entities';

export const tokensSelector = createSelector(entitiesSelector, entities => entities.tokens);

export const tokensPersistenceSelector = createSelector(entitiesSelector, entities => entities.tokensPersistence);

export const accessTokenSelector = createSelector(tokensSelector, tokens => tokens?.accessToken ?? null);
