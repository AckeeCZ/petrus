import { cancel, fork, call, delay } from 'redux-saga/effects';

import { config } from 'config';

import { validateTimeoutValue, calcTimeoutValue } from './utils';

let timerTask = null;

export function* cancelTimer() {
    if (timerTask) {
        yield cancel(timerTask);
        timerTask = null;
    }
}

function* startTimer(timeout, callbackSaga) {
    yield delay(timeout);
    yield call(callbackSaga);
}

/**
 * set timer for refreshing tokens
 * @param {DateString} expiration
 * @param {Function} callbackSaga
 */
export function* setTimer(expiration, callbackSaga) {
    const timeout = calcTimeoutValue(expiration);

    validateTimeoutValue(timeout, config.tokens);

    timerTask = yield fork(startTimer, timeout, callbackSaga);
}
