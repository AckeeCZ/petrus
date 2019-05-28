import { all } from 'redux-saga/effects';

import { saga as tokens } from 'Modules/tokens';
import { saga as authSession } from 'Modules/auth-session';
import authState, { getAuthStateChannel } from './authState';
import withAuthSession from './withAuthSession';

export { getAuthStateChannel, withAuthSession };

export default function* rootSaga() {
    yield all([authState(), authSession(), tokens()]);
}
