import localforage from 'localforage';

import * as Consts from '../../constants';

import config from '../config';

export function* clearTokens() {
    window.sessionStorage.removeItem(config.tokensKey);
    yield localforage.removeItem(config.tokensKey);
}

export function* storeTokens(tokens) {
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
}

export function* retrieveTokens() {
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
}
