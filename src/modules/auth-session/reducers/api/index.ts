import { ApiKeys } from 'constants/index';

import login from './login';
import logout from './logout';
import fetchUser from './fetchUser';

export default {
    [ApiKeys.LOGIN]: login,
    [ApiKeys.LOGOUT]: logout,
    [ApiKeys.FETCH_USER]: fetchUser,
} as const;
