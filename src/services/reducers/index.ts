import { combineReducers } from 'redux';
import type { PetrusCustomConfig } from 'types';

import api from './api';
import createEntitiesReducer from './entities';

export function createRootReducer(customEntitiesInitialState: PetrusCustomConfig['initialState']) {
    const entities = createEntitiesReducer(customEntitiesInitialState);
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
