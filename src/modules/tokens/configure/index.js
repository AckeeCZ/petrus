import { PetrusError } from 'config';
import { isFn } from 'services/utils';

import { config as refreshmentConfig } from '../modules/refreshment';
import { TokensPersistence } from '../modules/storage';

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
    autoStartTokensRetrieval: true,
    ...refreshmentConfig.options,
    ...customOptions,
});

export const initialState = (customInitialState = {}) => {
    return {
        ...customInitialState,
        persistence: TokensPersistence.LOCAL,
    };
};
