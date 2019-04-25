import { reducers } from '@ackee/redux-utils';
import { types } from '../../actions';

export default reducers.api.basic({
    actionTypes: {
        REQUEST: types.RETRIEVE_TOKENS_REQUEST,
        SUCCESS: types.RETRIEVE_TOKENS_RESOLVES,
    },
});
