import { PetrusError, PetrusErrorType, config } from 'config';
import type { PetrusTokens } from 'types';

export const isTokenExpired = (token?: PetrusTokens['accessToken']) => {
    if (!token?.expiration) {
        return true;
    }

    return Date.parse(token.expiration) - config.tokens.requestDurationEstimate <= Date.now();
};

export function calcTimeoutValue(expiration: string) {
    const timeout = Date.parse(expiration) - Date.now();

    return Math.max(timeout - config.tokens.requestDurationEstimate, 0);
}

export function validateTimeoutValue(timeout: number) {
    if (timeout === 0) {
        throw new PetrusError(
            PetrusErrorType.INVALID_TIMEOUT,
            `Can't set 0 timeout for refreshing tokens. Check the token 'expiration' propererty.`,
        );
    }

    /**
     * The `setTimeout` is using a 32 bit int to store the delay so the max value allowed would be `2147483648 === 0b10000000000000000000000000000000`.
     * If the delay value is bigger, the setTimeout fires immediately.
     * https://stackoverflow.com/questions/3468607/why-does-settimeout-break-for-large-millisecond-delay-values
     */
    const MAX_ALLOWED_VALUE = 2147483647;

    if (timeout > MAX_ALLOWED_VALUE) {
        throw new PetrusError(
            PetrusErrorType.INVALID_TIMEOUT,
            `Timeout for refreshing access token must be <= ${MAX_ALLOWED_VALUE}, received: ${timeout}.`,
        );
    }
}

/**
 * validate tokens expiration with `requestDurationEstimate` and `minRequiredExpiration` in count
 */
export function validateExpiration(expiration: string) {
    const timeout = calcTimeoutValue(expiration);

    try {
        validateTimeoutValue(timeout);
        return true;
    } catch (error) {
        config.logger.error(error);
        return false;
    }
}
