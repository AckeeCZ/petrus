import { basicApiReducer } from '@ackee/redux-utils';
import { types } from '../../actions';

export default basicApiReducer({
    actionTypes: {
        REQUEST: types.REFRESH_TOKENS_REQUEST,
        SUCCESS: types.REFRESH_TOKENS_SUCCESS,
        FAILURE: types.REFRESH_TOKENS_FAILURE,
    },
});
