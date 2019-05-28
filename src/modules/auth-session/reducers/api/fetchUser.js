import { basicApiReducer } from '@ackee/redux-utils';
import { types } from '../../actions';

export default basicApiReducer({
    actionTypes: {
        REQUEST: types.FETCH_USER_REQUEST,
        SUCCESS: types.FETCH_USER_SUCCESS,
        FAILURE: types.FETCH_USER_FAILURE,
    },
});
