import { createSelector } from 'reselect';
import { config } from 'config';

export const entitiesSelector = <AppState>(state: AppState) => {
    const { entities } = config.selector(state);
    return entities;
};

export const sessionStateSelector = createSelector(entitiesSelector, entities => entities.sessionState);
