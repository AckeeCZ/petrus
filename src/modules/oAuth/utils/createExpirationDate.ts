/**
 * Converts duration in ms to timestamp.
 *
 * @param expiresIn - **value** in **ms** when access token expires
 * @returns Access token expiration **date** in ISO string format.
 *
 * @category Utilities
 *
 * @example
 * ```ts
 * import { createExpirationDate } from '@ackee/petrus';
 *
 * // expiratioDate will be in following format: "2019-02-19T21:02:57.970Z"
 * const expirationDate = createExpirationDate(3600 * 1000);
 *
 * // VALID:
 * createExpirationDate('3600000');
 * createExpirationDate(null);
 * createExpirationDate(undefined);
 *
 * // INVALID:
 * createExpirationDate('foo');
 * createExpirationDate('foo123');
 * ```
 */
export function createExpirationDate(expiresIn: string | number | null | undefined) {
    if (expiresIn === null || expiresIn === undefined) {
        return null;
    }

    const parsedExpiresIn = typeof expiresIn === 'number' ? expiresIn : Number.parseInt(expiresIn, 10);

    if (Number.isNaN(parsedExpiresIn)) {
        throw new TypeError(
            // eslint-disable-next-line max-len
            `[@ackee/petrus]: 'createExpirationDate' method received an invalid 'expiresIn' value: '${expiresIn}'. Must be one of: null, undefined, number, or string parsable to number.`,
        );
    }

    const expirationDate = new Date(Date.now() + parsedExpiresIn);

    return expirationDate.toISOString();
}
