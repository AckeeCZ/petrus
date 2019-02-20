const isTokenExpired = token => {
    return token.expiration && Date.parse(token.expiration) <= Date.now();
};

export const isAnyTokenExpired = ({ refreshToken, ...tokens }) => {
    return Object.values(tokens).some(isTokenExpired);
};

export const hasExpirationProperty = ({ refreshToken, ...tokens }) => {
    return Object.values(tokens).some(token => token.expiration !== undefined);
};

/**
 * find token with the lowest expiration value
 */
export function findMinExpiration({ refreshToken, ...tokens }) {
    const values = Object.values(tokens);
    let minExpiration = values[0].expiration;

    for (const { expiration } of values) {
        if (expiration < minExpiration) {
            minExpiration = expiration;
        }
    }

    return minExpiration;
}

/**
 * calc timeout - when token expires
 * @param  {Number} expiration
 * @param  {Number} requestDurationEstimate
 * @return {Number}
 */
export function calcTimeout(expiration, requestDurationEstimate = 0) {
    const timeout = new Date(expiration) - new Date();

    return Math.max(timeout - requestDurationEstimate, 0);
}

export function validateTimeoutValue({ timeoutValue, tokens, options }) {
    if (timeoutValue === 0) {
        throw new Error(
            `Can't set 0 timeout for refreshing tokens. Check the token 'expiration' propererty.\nTokens: ${JSON.stringify(
                tokens,
                null,
                2,
            )}`,
        );
    } else if (timeoutValue < options.minRequiredExpiration) {
        throw new RangeError(
            `Token 'timeoutValue' value is too low. Minimum required value is: ${options.minRequiredExpiration +
                options.requestDurationEstimate}ms.`,
        );
    }
}
