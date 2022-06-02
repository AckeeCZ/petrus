/**
 * creates an access token expiration date from expiration timeout value
 * @param expiresIn - **value** in **ms** when access token expires
 * @returns Access token expiration **date** in ISO string format.
 * @category Utilities
 */
export function createExpirationDate(expiresIn: string | number | null | undefined) {
    if (expiresIn === null || expiresIn === undefined) {
        return null;
    }

    const parsedExpiresIn = typeof expiresIn === 'number' ? expiresIn : Number.parseInt(expiresIn, 10);

    if (Number.isNaN(parsedExpiresIn)) {
        throw new TypeError(
            `[@ackee/petrus]: 'createExpirationDate' method received an invalid 'expiresIn' value: '${expiresIn}'. Must be one of: null, undefined, number, or string parsable to number.`,
        );
    }

    const expirationDate = new Date(Date.now() + parsedExpiresIn);

    return expirationDate.toISOString();
}
