import { combineReducers } from 'redux';
import { basicResetReducer } from '@ackee/redux-utils';

import { apiReducers as authSession, types } from 'Modules/auth-session';
import { apiReducers as tokens } from 'Modules/tokens';

const { fetchUser, login, logout } = authSession;
const { refreshTokens, retrieveTokens } = tokens;

export default combineReducers({
    login: basicResetReducer(login, types.LOGOUT_SUCCESS),
    fetchUser: basicResetReducer(fetchUser, types.LOGOUT_SUCCESS),
    logout: basicResetReducer(logout, types.LOGIN_SUCCESS),

    refreshTokens: basicResetReducer(refreshTokens, types.LOGOUT_SUCCESS),
    retrieveTokens,
});
