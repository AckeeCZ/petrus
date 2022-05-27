import { combineReducers } from 'redux';
import type { PetrusCustomConfig, PetrusTokens, PetrusUser } from 'types';

import api from './api';
import createEntitiesReducer from './entities';

export function createRootReducer<User extends PetrusUser, Tokens extends PetrusTokens>(
    customEntitiesInitialState: PetrusCustomConfig<User, Tokens>['initialState'],
) {
    return combineReducers({
        api,
        entities: createEntitiesReducer<User, Tokens>(customEntitiesInitialState),
    });
}

export type PetrusRootState = ReturnType<ReturnType<typeof createRootReducer>>;
