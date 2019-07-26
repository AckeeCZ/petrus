export const options = {
    // refresh tokens 0.5s before token expires
    requestDurationEstimate: 500, // 0.5s
    minRequiredExpiration: 1000 * 60, // 1m

    checkTokenExpirationOnTabFocus: false,
};
