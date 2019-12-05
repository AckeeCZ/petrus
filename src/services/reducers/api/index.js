import { combineReducers } from 'redux';
import { basicResetReducer } from '@ackee/redux-utils';

import { apiReducers as authSession } from 'Modules/auth-session';
import { apiReducers as tokens } from 'Modules/tokens';

import { types } from '../../actions';

const { fetchUser, login, logout } = authSession;
const { refreshTokens, retrieveTokens } = tokens;

export default combineReducers({
    login: basicResetReducer(login, types.AUTH_SESSION_END),
    fetchUser: basicResetReducer(fetchUser, types.AUTH_SESSION_END),
    logout: basicResetReducer(logout, types.AUTH_SESSION_START),

    refreshTokens: basicResetReducer(refreshTokens, types.AUTH_SESSION_END),
    retrieveTokens,
});
