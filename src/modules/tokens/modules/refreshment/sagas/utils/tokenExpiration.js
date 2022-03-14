import { PetrusError, config } from 'config';

export const isTokenExpired = token => {
    return Boolean(token && token.expiration && Date.parse(token.expiration) <= Date.now());
};

export function calcTimeoutValue(expiration) {
    const timeout = new Date(expiration) - new Date();

    return Math.max(timeout - config.tokens.requestDurationEstimate, 0);
}

export function validateTimeoutValue(timeout, { minRequiredExpiration, requestDurationEstimate }) {
    if (timeout === 0) {
        throw new PetrusError(`Can't set 0 timeout for refreshing tokens. Check the token 'expiration' propererty.`);
    }

    if (timeout < minRequiredExpiration) {
        throw new PetrusError(
            `Token 'timeout' value is too low. Minimum required value is: ${
                minRequiredExpiration + requestDurationEstimate
            }ms.`,
        );
    }

    /**
     * The `setTimeout` is using a 32 bit int to store the delay so the max value allowed would be `2147483648 === 0b10000000000000000000000000000000`.
     * If the delay value is bigger, the setTimeout fires immediately.
     * https://stackoverflow.com/questions/3468607/why-does-settimeout-break-for-large-millisecond-delay-values
     */
    const MAX_ALLOWED_VALUE = 2147483647;

    if (timeout > MAX_ALLOWED_VALUE) {
        throw new Error(`Timeout for refreshing access token must be <= ${MAX_ALLOWED_VALUE}, received: ${timeout}.`);
    }
}

/**
 * validate tokens expiration with 'requestDurationEstimate' and 'minRequiredExpiration' in count
 * @param {DateString} expiration
 * @returns {Boolean}
 */
export function validateExpiration(expiration) {
    const timeout = calcTimeoutValue(expiration);

    try {
        validateTimeoutValue(timeout, config.tokens);
        return true;
    } catch (error) {
        return false;
    }
}
