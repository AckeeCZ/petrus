import type { PetrusOAuth, PetrusTokens } from 'types';

export function enforceRefreshTokenScheme(searchParams: PetrusOAuth['searchParams']): PetrusTokens['refreshToken'] {
    const { refreshToken } = searchParams;

    return {
        token: refreshToken,
    };
}
