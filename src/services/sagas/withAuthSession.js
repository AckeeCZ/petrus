import { take, race, call } from 'redux-saga/effects';

import { types } from '../actions';

export default function* withAuthSession(task) {
    while (true) {
        yield take(types.AUTH_SESSION_START);

        yield race({
            task: call(task),
            abort: take(types.AUTH_SESSION_END),
        });
    }
}
