import { combineReducers } from 'redux';

import api from './api';
import createEntitiesReducer from './entities';

export default function createReducer(customEntitiesInitialState) {
    return combineReducers({
        api,
        entities: createEntitiesReducer(customEntitiesInitialState),
    });
}
