const isTokenExpired = token => {
    return token.expiration && new Date(token.expiration) <= new Date();
};

export const isAnyTokenExpired = ({ refreshToken, ...tokens }) => {
    return Object.values(tokens).some(isTokenExpired);
};

export const hasExpirationProperty = ({ refreshTokens, ...tokens }) => {
    return Object.values(tokens).some(token => Boolean(token.expiration));
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
