import { take, race, call } from 'redux-saga/effects';

import { authSessionStart, authSessionEnd } from '../actions';
import { raceWithTerminate } from './helpers';

function* infiniteWithAuthSession(task) {
    while (true) {
        yield take(authSessionStart);

        yield race({
            task: call(task),
            abort: take(authSessionEnd),
        });
    }
}

export default function* withAuthSession(task) {
    yield raceWithTerminate(infiniteWithAuthSession, task);
}
