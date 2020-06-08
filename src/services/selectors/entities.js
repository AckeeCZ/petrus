import { createSelector } from 'reselect';
import { getReducerKey } from 'config';

export const entitiesSelector = state => state[getReducerKey()].entities;

export const sessionStateSelector = createSelector(entitiesSelector, entities => entities.sessionState);
