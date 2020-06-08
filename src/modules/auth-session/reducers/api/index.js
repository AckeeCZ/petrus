import { apiKeys } from 'constants/index';

import login from './login';
import logout from './logout';
import fetchUser from './fetchUser';

export default {
    [apiKeys.LOGIN]: login,
    [apiKeys.LOGOUT]: logout,
    [apiKeys.FETCH_USER]: fetchUser,
};
