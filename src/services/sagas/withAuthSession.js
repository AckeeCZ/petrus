import { take, race, call } from 'redux-saga/effects';

import { types } from '../actions';
import { raceWithTerminate } from './helpers';

function* infiniteWithAuthSession(task) {
    while (true) {
        yield take(types.AUTH_SESSION_START);

        yield race({
            task: call(task),
            abort: take(types.AUTH_SESSION_END),
        });
    }
}

export default function* withAuthSession(task) {
    yield raceWithTerminate(infiniteWithAuthSession, task);
}
