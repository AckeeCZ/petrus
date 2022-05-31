import { PetrusError } from 'config';
import { isFn } from 'services/utils';
import type { PetrusConfig, PetrusCustomConfig } from 'types';

import { config as refreshmentConfig } from '../modules/refreshment';

export const handlers = ({
    refreshTokens,
}: PetrusCustomConfig['handlers']): {
    refreshTokens: PetrusConfig['handlers']['refreshTokens'];
} => {
    if (!isFn(refreshTokens)) {
        throw new PetrusError(`'refreshTokens' is not a function: Received argument: ${refreshTokens}.`);
    }

    return {
        refreshTokens,
    } as const;
};

export const options = (customOptions: PetrusCustomConfig['tokens']): PetrusConfig['tokens'] => ({
    applyAccessTokenExternally: false,
    autoStartTokensRetrieval: true,
    ...refreshmentConfig.options,
    ...customOptions,
});
