export default function parseExpirationDate(expiresIn) {
    if (expiresIn === null || expiresIn === undefined) {
        return null;
    }

    const parsedExpiresIn = Number.parseInt(expiresIn, 10);

    if (Number.isNaN(parsedExpiresIn)) {
        throw new TypeError(
            `[@ackee/petrus]: 'enforceAccessTokenScheme' method received an invalid 'expiresIn' value: '${expiresIn}'. Must be one of: null, undefined, number, or string parsable to number.`,
        );
    }

    const expirationDate = new Date(Date.now() + parsedExpiresIn);

    return expirationDate.toISOString();
}
