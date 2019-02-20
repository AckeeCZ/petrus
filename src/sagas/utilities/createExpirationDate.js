import { isNil } from 'lodash';

/**
 * creates an access token expiration date from expiration timeout value
 * @param {Number|null|undefined} expiresIn - **value** in **ms** when access token expires
 * @returns {Number} - access token expiration **date** in ISO string format
 */
export default function createExpirationDate(expiresIn) {
    if (isNil(expiresIn)) {
        return null;
    }

    const parsedExpiresIn = Number.parseInt(expiresIn, 10);

    if (Number.isNaN(parsedExpiresIn)) {
        throw new TypeError(
            `[@ackee/petrus]: 'createExpirationDate' method received an invalid 'expiresIn' value: '${expiresIn}'. Must be one of: null, undefined, number, or string parsable to number.`,
        );
    }

    const expirationDate = new Date(Date.now() + parsedExpiresIn);

    return expirationDate.toISOString();
}
