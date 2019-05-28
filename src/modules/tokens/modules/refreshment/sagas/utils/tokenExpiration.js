import { PetrusError, config } from 'Config';

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
            `Token 'timeout' value is too low. Minimum required value is: ${minRequiredExpiration +
                requestDurationEstimate}ms.`,
        );
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
