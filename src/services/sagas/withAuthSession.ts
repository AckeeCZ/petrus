import { take, race, call } from 'redux-saga/effects';
import type { DefaultFn } from 'types';

import { authSessionStart, authSessionEnd } from '../actions';
import { raceWithTerminate } from './helpers';

function* infiniteWithAuthSession<Fn extends DefaultFn>(task: Fn, ...args: Parameters<Fn>) {
    while (true) {
        yield take(authSessionStart);

        yield race({
            task: call(task, ...args),
            abort: take(authSessionEnd),
        } as const);
    }
}

/**
 * @category Redux Saga
 */
export default function* withAuthSession<Fn extends DefaultFn>(task: Fn) {
    yield* raceWithTerminate(infiniteWithAuthSession, task);
}
