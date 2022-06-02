import type { PetrusOAuth, PetrusTokens } from 'types';
import { createExpirationDate } from '../utils';

export function enforceAccessTokenScheme(searchParams: PetrusOAuth['searchParams']): PetrusTokens['accessToken'] {
    const { accessToken, expiresIn, ...rest } = searchParams;

    return {
        ...rest,
        token: accessToken,
        expiration: createExpirationDate(expiresIn),
    };
}
