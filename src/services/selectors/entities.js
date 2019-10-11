import { createSelector } from 'reselect';
import { getReducerKey } from 'Config';

export const entitiesSelector = state => state[getReducerKey()].entities;

export const sessionStateSelector = createSelector(
    entitiesSelector,
    entities => entities.sessionState,
);
