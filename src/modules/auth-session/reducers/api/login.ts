import { basicApiReducer } from '@ackee/redux-utils';
import { login } from '../../actions';

export default basicApiReducer({
    actionTypes: login.types,
});
