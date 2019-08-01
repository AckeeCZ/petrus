import { fork, take, cancel } from 'redux-saga/effects';
import { types } from '../actions';

export function* raceWithTerminate(...args) {
    const task = yield fork(...args);

    yield take(types.TERMINATE);

    yield cancel(task);
}
