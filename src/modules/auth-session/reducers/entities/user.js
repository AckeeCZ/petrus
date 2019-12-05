import { types as globalTypes } from 'Services/actions';

import { types } from '../../actions';

const initialState = null;

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_USER_SUCCESS:
            return action.payload;

        case globalTypes.AUTH_SESSION_END:
            return initialState;

        default:
            return state;
    }
}
