import { combineReducers } from 'redux';
import { reducers } from '@ackee/redux-utils';

import { apiReducers as authSession, types } from 'Modules/auth-session';
import { apiReducers as tokens } from 'Modules/tokens';

const { fetchUser, login, logout } = authSession;
const { refreshTokens, retrieveTokens } = tokens;

const resetReducer = reducers.reset.basic;

export default combineReducers({
    login: resetReducer(login, types.LOGOUT_SUCCESS),
    fetchUser: resetReducer(fetchUser, types.LOGOUT_SUCCESS),
    logout: resetReducer(logout, types.LOGIN_SUCCESS),

    refreshTokens: resetReducer(refreshTokens, types.LOGOUT_SUCCESS),
    retrieveTokens,
});
