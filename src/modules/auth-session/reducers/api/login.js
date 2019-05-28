import { basicApiReducer } from '@ackee/redux-utils';
import { types } from '../../actions';

export default basicApiReducer({
    actionTypes: {
        REQUEST: types.LOGIN_REQUEST,
        SUCCESS: types.LOGIN_SUCCESS,
        FAILURE: types.LOGIN_FAILURE,
    },
});
