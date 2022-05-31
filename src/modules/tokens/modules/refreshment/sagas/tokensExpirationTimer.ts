import type { Task } from 'redux-saga';
import { cancel, fork, call, delay } from 'redux-saga/effects';

import { config } from 'config';

import { validateTimeoutValue, calcTimeoutValue } from './utils';
import type { DefaultFn } from 'types';

let timerTask: Task | null = null;

export function* cancelTimer() {
    if (timerTask) {
        yield cancel(timerTask);
        timerTask = null;
    }
}

function* startTimer(timeout: number, callbackSaga: DefaultFn) {
    yield delay(timeout);
    yield call(callbackSaga);
}

/**
 * set timer for refreshing tokens
 */
export function* setTimer(expiration: string, callbackSaga: DefaultFn) {
    const timeout = calcTimeoutValue(expiration);

    validateTimeoutValue(timeout, config.tokens);

    timerTask = yield fork(startTimer, timeout, callbackSaga);
}
