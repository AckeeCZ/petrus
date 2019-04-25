import { combineReducers } from 'redux';

import login from './login';
import logout from './logout';
import refreshTokens from './refreshTokens';
import fetchUser from './fetchUser';
import retrieveTokens from './retrieveTokens';

export default combineReducers({
    login,
    logout,
    refreshTokens,
    fetchUser,
    retrieveTokens,
});
