import localforage from 'localforage';

import * as Consts from '../../constants';

import config from '../config';

export const clearTokens = function*() {
    window.sessionStorage.removeItem(config.tokensKey);
    yield localforage.removeItem(config.tokensKey);
};

export const storeTokens = function*(tokens) {
    switch (config.options.tokens.persistence) {
        case Consts.tokens.persistence.LOCAL:
            window.sessionStorage.removeItem(config.tokensKey);
            yield localforage.setItem(config.tokensKey, tokens);
            break;

        case Consts.tokens.persistence.SESSION:
            yield localforage.removeItem(config.tokensKey);
            window.sessionStorage.setItem(config.tokensKey, JSON.stringify(tokens));
            break;

        default:
    }
};

export const retrieveTokens = function*() {
    switch (config.options.tokens.persistence) {
        case Consts.tokens.persistence.LOCAL:
            window.sessionStorage.removeItem(config.tokensKey);
            return yield localforage.getItem(config.tokensKey);

        case Consts.tokens.persistence.SESSION: {
            yield localforage.removeItem(config.tokensKey);
            const stringifiedTokens = window.sessionStorage.getItem(config.tokensKey);
            return JSON.parse(stringifiedTokens);
        }

        default:
            return null;
    }
};
