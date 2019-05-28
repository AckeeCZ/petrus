import { types } from '../../actions';

const initialState = null;

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_USER_SUCCESS:
            return action.payload;

        case types.LOGOUT_SUCCESS:
            return initialState;

        default:
            return state;
    }
}
