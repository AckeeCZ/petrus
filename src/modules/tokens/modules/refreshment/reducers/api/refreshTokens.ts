import { basicApiReducer } from '@ackee/redux-utils';
import { refreshTokens } from '../../actions';

export default basicApiReducer({
    actionTypes: refreshTokens.types,
});
