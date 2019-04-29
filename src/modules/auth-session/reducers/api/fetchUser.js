import { reducers } from '@ackee/redux-utils';
import { types } from '../../actions';

export default reducers.api.basic({
    actionTypes: {
        REQUEST: types.FETCH_USER_REQUEST,
        SUCCESS: types.FETCH_USER_SUCCESS,
        FAILURE: types.FETCH_USER_FAILURE,
    },
});
