import { config } from 'config';
import type { PetrusEntitiesState, PetrusUser } from 'types';

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
export const entitiesSelector = <AppState, User extends PetrusUser = PetrusUser>(state: AppState) => {
    const { entities } = config.selector<AppState>(state);
    return entities as PetrusEntitiesState<User>;
};
