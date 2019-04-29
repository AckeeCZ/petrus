import { authSession } from 'Consts';

import { types } from '../../actions';

const initialState = null;

export default function authSessionState(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_SESSION_START:
            return authSession.ACTIVE;

        case types.AUTH_SESSION_PAUSE:
            return authSession.PAUSED;

        case types.AUTH_SESSION_RESUME:
            return authSession.ACTIVE;

        case types.AUTH_SESSION_END:
            return authSession.INACTIVE;

        default:
            return state;
    }
}
