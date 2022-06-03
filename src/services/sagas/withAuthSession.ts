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

function* withAuthSessionInner<Fn extends DefaultFn>(task: Fn) {
    yield* raceWithTerminate(infiniteWithAuthSession, task);
}

/**
 * A generator function that receives any function as 1st parameter. The provided function will be launched on `AUTH_SESSION_START` action and cancelled on `AUTH_SESSION_END`.
 * Note that `withAuthSession` is a blocking task (if you need to make it non-blocking one, use it with `fork` effect).
 *
 * @category Redux Saga
 *
 * @example
 * ```ts
 * import { withAuthSession } from '@ackee/petrus';
 *
 * function* myAuthSaga() {}
 *
 * export default function* () {
 *     yield* withAuthSession(myAuthSaga);
 *     // non-blocking version: yield fork(withAuthSession, myAuthSaga);
 * }
 * ```
 */
export function* withAuthSession<Fn extends DefaultFn>(task: Fn) {
    // NOTE: this just for nice tsdocs output. Without this casting, the return type would include all types of delegated iteragors, so total unreadable mess.
    yield* withAuthSessionInner(task) as Generator<any, void>;
}
