import type { PetrusConfig } from 'types';

type TokensRefreshmentOptions = {
    requestDurationEstimate: PetrusConfig['tokens']['requestDurationEstimate'];
    minRequiredExpiration: PetrusConfig['tokens']['minRequiredExpiration'];
    checkTokenExpirationOnTabFocus: PetrusConfig['tokens']['checkTokenExpirationOnTabFocus'];
};

export const options: TokensRefreshmentOptions = {
    // refresh tokens 0.5s before token expires
    requestDurationEstimate: 500, // 0.5s
    minRequiredExpiration: 1000 * 60, // 1m

    checkTokenExpirationOnTabFocus: true,
} as const;
