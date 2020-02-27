import { tokensPersistence } from '../../constants';
import { types } from '../../actions';

export const initialState = tokensPersistence.LOCAL;

export default function tokensPersistenceReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_TOKENS_PERSISTENCE:
            return action.persistence;

        default:
            return state;
    }
}
