import type { PetrusConfig } from 'types';

type TokensRefreshmentOptions = {
    requestDurationEstimate: PetrusConfig['tokens']['requestDurationEstimate'];
    minRequiredExpiration: PetrusConfig['tokens']['minRequiredExpiration'];
    checkTokenExpirationOnTabFocus: PetrusConfig['tokens']['checkTokenExpirationOnTabFocus'];
};

export const options: TokensRefreshmentOptions = {
    // refresh tokens 0.5s before token expires
    requestDurationEstimate: 2 * 60 * 100, // 2m,
    minRequiredExpiration: 2 * 60 * 1000, // 2m

    checkTokenExpirationOnTabFocus: true,
} as const;
