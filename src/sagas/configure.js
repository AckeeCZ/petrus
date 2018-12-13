import * as Consts from '../constants';
import { factoryReducer } from '../reducer';

import config from './config';
import RefreshTokensTimeout from './tokens/RefreshTokensTimeout';
import initializeSaga from './initialize';

const isFn = val => typeof val === 'function';

const handlersValidators = {
    authenticate: {
        errorMessage: authenticate => `@ackee/petrus: 'authenticate' is not a function: '${authenticate}'`,
        validator: isFn,
    },
    refreshTokens: {
        errorMessage: refreshTokens => `@ackee/petrus: 'refreshTokens' is not a function: ${refreshTokens}`,
        validator: isFn,
    },
    getAuthUser: {
        errorMessage: getAuthUser => {
            const { LOCAL, NONE } = Consts.tokens.persistence;

            return `@ackee/petrus: 'getAuthUser' is not a function: ${getAuthUser}. Tokens persistence is set to '${LOCAL}'. Change persistence to '${NONE}' or provide function for fetching authorized user.`;
        },

        validator: (value, tokensPersistence) =>
            tokensPersistence === Consts.tokens.persistence.LOCAL ? isFn(value) : true,
    },
};

function validateHandlers(handlers = {}, { persistence }) {
    for (const [handlerKey, { errorMessage, validator }] of Object.entries(handlersValidators)) {
        const handler = handlers[handlerKey];

        if (!validator(handler, persistence)) {
            throw new TypeError(errorMessage(handler));
        }
    }
}

export default function configure(customParams) {
    const { handlers, options, initialState } = {
        handlers: {},
        options: {},
        ...customParams,
    };

    config.options = {
        ...config.options,
        ...options,
        tokens: {
            ...config.options.tokens,
            ...RefreshTokensTimeout.options,
            ...options.tokens,
        },
    };

    const tokensPersistence = initialState.tokensPersistence || Consts.tokens.persistence.LOCAL;

    validateHandlers(handlers, {
        tokensPersistence,
    });

    config.remoteLogin = handlers.authenticate;
    config.remoteRefreshTokens = handlers.refreshTokens;
    config.remoteGetAuthUser = handlers.getAuthUser;

    return {
        saga: initializeSaga,
        reducer: factoryReducer({
            ...initialState,
            tokensPersistence,
        }),
    };
}
