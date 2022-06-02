import type { Task } from 'redux-saga';
import { fork, take, cancel } from 'redux-saga/effects';
import type { DefaultFn } from 'types';
import { terminate } from '../actions';

export function* raceWithTerminate<Fn extends DefaultFn>(saga: Fn, ...args: Parameters<Fn>) {
    const task: Task = yield fork(saga, ...args);

    yield take(terminate);

    yield cancel(task);
}
