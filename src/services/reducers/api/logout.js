import { reducers } from '@ackee/redux-utils';
import { types } from '../../actions';

export default reducers.api.basic({
    actionTypes: {
        REQUEST: types.LOGOUT_REQUEST,
        SUCCESS: types.LOGOUT_SUCCESS,
        FAILURE: types.LOGOUT_FAILURE,
    },
});
