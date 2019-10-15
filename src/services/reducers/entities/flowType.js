import { FlowType } from 'Consts/index';

import { types as retrievalTypes } from 'Modules/tokens/modules/retrieval';
import { types } from '../../actions';

const initialState = FlowType.INDETERMINATE;

export default function authSessionState(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_SESSION_START:
            return FlowType.AUTHENTICATED;

        case types.AUTH_SESSION_END:
            return FlowType.ANONYMOUS;

        case retrievalTypes.RETRIEVE_TOKENS_RESOLVE: {
            const { tokensRetrieved } = action.payload;

            return tokensRetrieved ? state : FlowType.ANONYMOUS;
        }

        default:
            return state;
    }
}
