import { basicApiReducer } from '@ackee/redux-utils';
import { types } from '../../actions';

export default basicApiReducer({
    actionTypes: {
        REQUEST: types.LOGOUT_REQUEST,
        SUCCESS: types.LOGOUT_SUCCESS,
        FAILURE: types.LOGOUT_FAILURE,
    },
});
