import { isTokenExpired } from '../tokenExpiration';

jest.mock('config', () => ({
    config: {
        tokens: {
            requestDurationEstimate: 1000,
        },
    },
}));

describe('isTokenExpired', () => {
    it('should return false for access token with expiration in the future', () => {
        const nonExpired = new Date(Date.now() + 5000).toISOString();
        expect(
            isTokenExpired({
                token: 'access_token',
                expiration: nonExpired,
            }),
        ).toBe(false);
    });

    it('should return true for access token with expiration in the past', () => {
        const expired = new Date(Date.now() - 5000).toISOString();

        expect(
            isTokenExpired({
                token: 'access_token',
                expiration: expired,
            }),
        ).toBe(true);
    });
});
