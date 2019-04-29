import { PetrusError } from 'Config';
import { isFn } from 'Services/utils';

import { tokensPersistence as TokenPeristence } from 'Modules/tokens';

export const handlers = ({ authenticate, getAuthUser } = {}, { oAuthEnabled, tokensPersistence }) => {
    if (!oAuthEnabled && !isFn(authenticate)) {
        throw new PetrusError(`'authenticate' is not a function: Received argument: '${authenticate}'.`);
    }

    const { LOCAL, NONE } = TokenPeristence;

    if (tokensPersistence === LOCAL && !isFn(getAuthUser)) {
        throw new PetrusError(
            `'getAuthUser' is not a function: '${getAuthUser}'. Tokens persistence is set to '${LOCAL}'. Change tokens persistence to '${NONE}' or provide function for fetching authorized user.`,
        );
    }

    return {
        authenticate,
        getAuthUser,
    };
};
