import { PetrusError } from 'Config';
import { isFn } from 'Services/utils';

import { config as refreshmentConfig } from '../modules/refreshment';
import { tokensPersistence } from '../modules/storage';

export const handlers = ({ refreshTokens } = {}) => {
    if (!isFn(refreshTokens)) {
        throw new PetrusError(`'refreshTokens' is not a function: Received argument: ${refreshTokens}.`);
    }

    return {
        refreshTokens,
    };
};

export const options = (customOptions = {}) => ({
    applyAccessTokenExternally: false,
    ...refreshmentConfig.options,
    ...customOptions,
});

export const initialState = (customInitialState = {}) => {
    return {
        ...customInitialState,
        persistence: tokensPersistence.LOCAL,
    };
};
