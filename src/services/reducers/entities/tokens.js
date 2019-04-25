import { types } from '../../actions';

const initialState = {};

export default function tokensReducer(state = initialState, action) {
    switch (action.type) {
        case types.REFRESH_TOKENS_SUCCESS:
        case types.LOGIN_SUCCESS:
            return action.payload;

        case types.LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
}
