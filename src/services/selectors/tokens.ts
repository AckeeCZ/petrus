import { entitiesSelector } from './entities';

/**
 * @category Redux Selector
 */
export const tokensSelector = <AppState>(state: AppState) => entitiesSelector<AppState>(state).tokens;

/**
 * @category Redux Selector
 */
export const tokensPersistenceSelector = <AppState>(state: AppState) =>
    entitiesSelector<AppState>(state).tokensPersistence;

/**
 * @category Redux Selector
 */
export const accessTokenSelector = <AppState>(state: AppState) => tokensSelector(state)?.accessToken ?? null;
