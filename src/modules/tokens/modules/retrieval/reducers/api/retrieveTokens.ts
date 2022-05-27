import { basicApiReducer } from '@ackee/redux-utils';
import { retrieveTokensRequest, retrieveTokensResolve } from '../../actions';

export default basicApiReducer({
    actionTypes: {
        REQUEST: retrieveTokensRequest.type,
        SUCCESS: retrieveTokensResolve.type,
    },
});
