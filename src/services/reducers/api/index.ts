import { combineReducers } from 'redux';
import { basicResetReducer } from '@ackee/redux-utils';

import { apiReducers as authSession } from 'modules/auth-session';
import { apiReducers as tokens } from 'modules/tokens';

import { authSessionEnd, authSessionStart } from '../../actions';

const { fetchUser, login, logout } = authSession;
const { refreshTokens, retrieveTokens } = tokens;

export default combineReducers({
    login: basicResetReducer(login, authSessionEnd.type),
    fetchUser: basicResetReducer(fetchUser, authSessionEnd.type),
    logout: basicResetReducer(logout, authSessionStart.type),

    refreshTokens: basicResetReducer(refreshTokens, authSessionEnd.type),
    retrieveTokens,
});
