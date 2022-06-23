import { config } from 'config';
import type { AppRootState, PetrusEntitiesState } from 'types';

/**
 * @category Redux Selector
 *
 * @example
 * ```ts
 * import { select } from 'redux-saga/effects';
 * import { createSelector } from 'reselect';
 * import { entitiesSelector } from '@ackee/petrus';
 *
 * const authUserSelector = createSelector(entitiesSelector, entities => entities.user);
 *
 * function* selectAuthUser() {
 *     const authUser = yield select(authUserSelector);
 *     // ...
 * }
 * ```
 */
export const entitiesSelector = (state: AppRootState) => {
    const { entities } = config.selector(state);
    return entities as PetrusEntitiesState;
};
