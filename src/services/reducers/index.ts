import { combineReducers } from 'redux';
import type { PetrusCustomConfig, PetrusUser } from 'types';

import api from './api';
import createEntitiesReducer from './entities';

export function createRootReducer<User extends PetrusUser>(
    customEntitiesInitialState: PetrusCustomConfig<User>['initialState'],
) {
    const entities = createEntitiesReducer<User>(customEntitiesInitialState);
    const rootReducer = combineReducers({
        api,
        entities: entities.reducer,
    });

    return {
        rootReducer,
        entitiesInitState: entities.initState,
    };
}

export type PetrusRootState = ReturnType<ReturnType<typeof createRootReducer>['rootReducer']>;
