import { basicApiReducer } from '@ackee/redux-utils';
import { types } from '../../actions';

export default basicApiReducer({
    actionTypes: {
        REQUEST: types.RETRIEVE_TOKENS_REQUEST,
        SUCCESS: types.RETRIEVE_TOKENS_RESOLVE,
    },
});
