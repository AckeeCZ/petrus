import { getReducerKey } from 'Config';

export const entitiesSelector = state => state[getReducerKey()].entities;
