import { all } from 'redux-saga/effects';

import fetchUser from './fetchUser';
import directLogin from './directLogin';
import login from './login';
import logout from './logout';

export default function* authSession() {
    yield all([fetchUser(), directLogin(), login(), logout()]);
}
