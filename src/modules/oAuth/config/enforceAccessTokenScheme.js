import { createExpirationDate } from '../utils';

export default function enforceAccessTokenScheme(searchParams) {
    const { accessToken, expiresIn, ...rest } = searchParams;

    return {
        ...rest,
        token: accessToken,
        expiration: createExpirationDate(expiresIn),
    };
}
