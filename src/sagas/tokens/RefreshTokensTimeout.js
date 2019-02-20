import { eventChannel } from 'redux-saga';
import { findMinExpiration, calcTimeout, validateTimeoutValue } from './utilities';
import { globalEnv } from '../../config';

export default class RefreshTokensTimeout {
    static options = {
        // refresh tokens 0.5s before token expires
        requestDurationEstimate: 500, // 0.5s
        minRequiredExpiration: 1000 * 60, // 1m
    };

    constructor(options) {
        this.options = {
            ...RefreshTokensTimeout.options,
            ...options,
        };

        this.timerId = null;
    }

    calcTimeoutValue(tokens) {
        const expiration = findMinExpiration(tokens);
        const timeoutValue = calcTimeout(expiration, this.options.requestDurationEstimate);

        return timeoutValue;
    }

    clearTimeout() {
        if (this.timerId) {
            globalEnv.clearTimeout(this.timerId);
            this.timerId = null;
        }
    }

    makeTimeoutChannel(timeout) {
        const timeoutChannel = eventChannel(emitter => {
            this.timerId = globalEnv.setTimeout(() => {
                // emitter callback must be provided
                // with an argument
                emitter(timeout);
            }, timeout);

            // return unsubscribe method
            return this.clearTimeout;
        });

        return timeoutChannel;
    }

    /**
     * validate tokens expiration with 'requestDurationEstimate'
     * and 'minRequiredExpiration' in count
     * @param {Object} tokens
     * @returns {Boolean}
     */
    validateExpiration(tokens) {
        const timeoutValue = this.calcTimeoutValue(tokens);

        try {
            validateTimeoutValue({
                timeoutValue,
                options: this.options,
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
    setTimeout(tokens) {
        this.clearTimeout();

        const timeoutValue = this.calcTimeoutValue(tokens);

        validateTimeoutValue({
            timeoutValue,
            options: this.options,
            tokens,
        });

        const timeoutChannel = this.makeTimeoutChannel(timeoutValue);

        return timeoutChannel;
    }
}
