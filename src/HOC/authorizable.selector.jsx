import { registerSelector } from '@ackee/redux-worker/worker';
import * as selectors from '../selectors';
import { AUTHORIZABLE_BRIDGE_ID } from '../constants';

const mapStateToProps = state => ({
    authUser: selectors.authUser(state),
    triedToRetrieveTokens: selectors.triedToRetrieveTokens(state),
    isLoggingIn: selectors.isLoggingIn(state),
    isUserFetching: selectors.isUserFetching(state),
});

registerSelector(AUTHORIZABLE_BRIDGE_ID, mapStateToProps);
