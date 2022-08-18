import { combineReducers } from 'redux';
import { reducer as petrus } from '../petrus';

export const rootReducer = combineReducers({
    petrus,
});
