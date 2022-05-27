import { combineReducers } from 'redux';
import { basicResetReducer } from '@ackee/redux-utils';

import { authSessionApiReducers } from 'modules/auth-session';
import { tokensRefreshmentApiReducers } from 'modules/tokens/modules/refreshment';
import { tokensRetrievalApiReducers } from 'modules/tokens/modules/retrieval';

import { authSessionEnd, authSessionStart } from '../../actions';

export default combineReducers({
    login: basicResetReducer(authSessionApiReducers.login, authSessionEnd.type),
    fetchUser: basicResetReducer(authSessionApiReducers.fetchUser, authSessionEnd.type),
    logout: basicResetReducer(authSessionApiReducers.logout, authSessionStart.type),

    refreshTokens: basicResetReducer(tokensRefreshmentApiReducers.refreshTokens, authSessionEnd.type),
    retrieveTokens: tokensRetrievalApiReducers.retrieveTokens,
});
