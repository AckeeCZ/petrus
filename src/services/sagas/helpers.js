import { fork, take, cancel } from 'redux-saga/effects';
import { terminate } from '../actions';

export function* raceWithTerminate(...args) {
    const task = yield fork(...args);

    yield take(terminate);

    yield cancel(task);
}
