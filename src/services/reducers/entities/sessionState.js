import { AuthSession } from 'Consts/index';

import { types } from '../../actions';

const initialState = null;

export default function authSessionState(state = initialState, action) {
    switch (action.type) {
        case types.AUTH_SESSION_START:
            return AuthSession.ACTIVE;

        case types.AUTH_SESSION_PAUSE:
            return AuthSession.PAUSED;

        case types.AUTH_SESSION_RESUME:
            return AuthSession.ACTIVE;

        case types.AUTH_SESSION_END:
            return AuthSession.INACTIVE;

        default:
            return state;
    }
}
