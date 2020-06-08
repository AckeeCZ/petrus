import { FlowType } from 'constants/index';

import { types as retrievalTypes } from 'modules/tokens/modules/retrieval';
import { types as authSessionTypes } from 'modules/auth-session';
import { types } from '../../actions';

const initialState = FlowType.INDETERMINATE;

export default function authSessionState(state = initialState, action) {
    switch (action.type) {
        case retrievalTypes.RETRIEVE_TOKENS_RESOLVE: {
            const { tokensRetrieved } = action.payload;

            return tokensRetrieved ? state : FlowType.ANONYMOUS;
        }

        case types.AUTH_SESSION_START:
            return FlowType.AUTHENTICATED;

        case authSessionTypes.LOGOUT_REQUEST:
            return FlowType.ANONYMOUS;

        default:
            return state;
    }
}
