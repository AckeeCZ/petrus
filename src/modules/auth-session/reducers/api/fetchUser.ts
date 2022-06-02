import { basicApiReducer } from '@ackee/redux-utils';
import { fetchUser } from '../../actions';

export default basicApiReducer({
    actionTypes: fetchUser.types,
});
