import { basicApiReducer } from '@ackee/redux-utils';
import { logout } from '../../actions';

export default basicApiReducer({
    actionTypes: logout.types,
});
