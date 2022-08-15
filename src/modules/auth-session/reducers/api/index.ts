import login from './login';
import logout from './logout';
import fetchUser from './fetchUser';

export const authSessionApiReducers = {
    login,
    logout,
    fetchUser,
} as const;
