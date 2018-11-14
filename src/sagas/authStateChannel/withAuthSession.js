import { call, cancel, all } from 'redux-saga/effects';
import { logger } from '../../config';

const authSagas = new Set();
let authSagaTasks = [];

/**
 * Launch all sagas from the authSagas set
 * and save each saga task to authSagaTasks array.
 */
export function* runAuthSagas() {
    for (const saga of authSagas.values()) {
        const task = call(saga);
        authSagaTasks.push(task);
    }

    yield all(authSagaTasks);
}

/**
 * Cancel all runnning sagas in the authSagaTasks array.
 */
export function* cancelAuthSagas() {
    for (const saga of authSagaTasks) {
        yield cancel(saga);
    }
    authSagaTasks = [];
}

/**
 * Add generator function to authSagas set.
 * All sagas in the set are then launch on AUTH_SESSION_START
 * and cancelled on AUTH_SESSION_END
 * @param {Function} saga
 */
export default function withAuthSession(saga) {
    if (typeof saga === 'function') {
        if (authSagas.has(saga)) {
            logger.warn(`withAuthSession was called more than once with the same function:\n${saga}`);
        } else {
            authSagas.add(saga);
        }
    } else {
        throw new TypeError(`withAuthSession function accepts as 1st parameter only functions, not '${typeof saga}'.`);
    }
}
