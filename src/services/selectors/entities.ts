import { config } from 'config';
import type { PetrusEntitiesState, PetrusUser } from 'types';

/**
 * @category Redux Selector
 */
export const entitiesSelector = <AppState, User extends PetrusUser = PetrusUser>(state: AppState) => {
    const { entities } = config.selector<AppState>(state);
    return entities as PetrusEntitiesState<User>;
};
