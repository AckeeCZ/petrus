import { PetrusError, PetrusErrorType } from 'config';
import { isFn } from 'services/utils';
import type { PetrusConfig, PetrusCustomConfig } from 'types';

import { config as refreshmentConfig } from '../modules/refreshment';

export const handlers = ({
    refreshTokens,
}: PetrusCustomConfig['handlers']): {
    refreshTokens: PetrusConfig['handlers']['refreshTokens'];
} => {
    if (!isFn(refreshTokens)) {
        throw new PetrusError(
            PetrusErrorType.INVALID_REFRESH_TOKENS_HANDLER,
            `'refreshTokens' is not a function: Received argument: ${refreshTokens}.`,
        );
    }

    return {
        refreshTokens,
    } as const;
};

export const options = (customOptions: PetrusCustomConfig['tokens']): PetrusConfig['tokens'] => ({
    autoStartTokensRetrieval: true,
    ...refreshmentConfig.options,
    ...customOptions,
});
