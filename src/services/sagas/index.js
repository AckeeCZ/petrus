import { all } from 'redux-saga/effects';

import { saga as tokens } from 'Modules/tokens';
import { saga as authSession } from 'Modules/auth-session';
import authState, { getAuthStateChannel } from './authState';
import withAuthSession from './withAuthSession';
import getAccessToken from './getAccessToken';
import { raceWithTerminate } from './helpers';

export { getAuthStateChannel, withAuthSession, getAccessToken };

export default function* rootSaga() {
    yield raceWithTerminate(function*() {
        yield all([authState(), authSession(), tokens()]);
    });
}
