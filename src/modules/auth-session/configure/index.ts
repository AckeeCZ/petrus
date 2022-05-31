import { PetrusError } from 'config';
import { isFn } from 'services/utils';

import { TokensPersistence } from 'modules/tokens';
import type { PetrusConfig, PetrusCustomConfig } from 'types';

export const handlers = (
    { authenticate, getAuthUser }: PetrusCustomConfig['handlers'],
    { oAuthEnabled, tokensPersistence }: { oAuthEnabled: boolean; tokensPersistence: TokensPersistence },
): {
    getAuthUser: PetrusConfig['handlers']['getAuthUser'];
    authenticate: PetrusConfig['handlers']['authenticate'];
} => {
    if (!oAuthEnabled && !isFn(authenticate)) {
        throw new PetrusError(`'authenticate' is not a function: Received argument: '${authenticate}'.`);
    }

    const { LOCAL, NONE } = TokensPersistence;

    if (tokensPersistence === LOCAL && !isFn(getAuthUser)) {
        throw new PetrusError(
            // eslint-disable-next-line max-len
            `'getAuthUser' is not a function: '${getAuthUser}'. Tokens persistence is set to '${LOCAL}'. Change tokens persistence to '${NONE}' or provide function for fetching authorized user.`,
        );
    }

    return {
        authenticate,
        getAuthUser,
    } as const;
};
