import { eventChannel } from 'redux-saga';

import { globalEnv, config } from 'Config';

import { findMinExpiration, calcTimeout, validateTimeoutValue } from './tokenExpiration';

const getOptions = () => config.options.tokens;

let timerId = null;

export function calcTimeoutValue(tokens) {
    const expiration = findMinExpiration(tokens);

    return calcTimeout(expiration, getOptions().requestDurationEstimate);
}

export function resetTimer() {
    if (timerId) {
        globalEnv.clearTimeout(timerId);
        timerId = null;
    }
}

export function makeTimeoutChannel(timeout) {
    const timeoutChannel = eventChannel(emitter => {
        timerId = globalEnv.setTimeout(() => {
            // emitter callback must be provided
            // with an argument
            emitter(timeout);
        }, timeout);

        // return unsubscribe method
        return clearTimeout;
    });

    return timeoutChannel;
}

/**
 * validate tokens expiration with 'requestDurationEstimate'
 * and 'minRequiredExpiration' in count
 * @param {Object} tokens
 * @returns {Boolean}
 */
export function validateExpiration(tokens) {
    const timeoutValue = calcTimeoutValue(tokens);

    try {
        validateTimeoutValue({
            timeoutValue,
            options: getOptions(),
            tokens,
        });
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * 1. reset any previous timeout
 * 2. find token with the smallest expiration value
 * 3. calculate timeout value
 * 4. set timeout for refreshing tokens
 * @param {Object} [tokens={}]
 */
export function setTimer(tokens) {
    resetTimer();

    const timeoutValue = calcTimeoutValue(tokens);

    validateTimeoutValue({
        timeoutValue,
        options: getOptions,
        tokens,
    });

    const timeoutChannel = makeTimeoutChannel(timeoutValue);

    return timeoutChannel;
}
