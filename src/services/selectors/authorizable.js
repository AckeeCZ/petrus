import { createSelector } from 'reselect';

import { entitiesSelector } from './entities';

export const flowTypeSelector = createSelector(entitiesSelector, ({ flowType }) => flowType);
