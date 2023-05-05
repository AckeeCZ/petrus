import { all } from 'redux-saga/effects';

import { saga as authSession } from 'modules/auth-session';
import { saga as tokens } from 'modules/tokens';
import authState from './authState';
import { raceWithTerminate } from './helpers';

export { getAccessToken } from './getAccessToken';
export { withAuthSession } from './withAuthSession';

export default function* rootSaga() {
    yield* raceWithTerminate(function* () {
        yield all([authState(), authSession(), tokens()]);
    });
}
