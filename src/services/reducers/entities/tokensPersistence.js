import { types } from '../../actions';

const initialState = null;

export default function tokensPersistenceReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_TOKENS_PERSISTENCE:
            return action.payload;

        default:
            return state;
    }
}
