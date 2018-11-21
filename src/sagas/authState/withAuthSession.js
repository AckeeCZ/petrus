import { take, race, call } from 'redux-saga/effects';

import { AUTH_SESSION_START, AUTH_SESSION_END } from '../../actionType';

export default function* withAuthSession(task) {
    while (true) {
        yield take(AUTH_SESSION_START);

        yield race({
            task: call(task),
            abort: take(AUTH_SESSION_END),
        });
    }
}
