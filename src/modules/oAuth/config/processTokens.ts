import type { PetrusTokens } from 'types';

export function processTokens(
    accessToken: PetrusTokens['accessToken'],
    refreshToken: PetrusTokens['refreshToken'],
): PetrusTokens | null {
    if (!accessToken) {
        return null;
    }

    return {
        accessToken,
        refreshToken,
    };
}
