import { types } from 'services/actions';

const initialState = {};

export default function tokensReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_TOKENS:
            return action.payload;

        case types.DELETE_TOKENS:
            return initialState;

        default:
            return state;
    }
}
