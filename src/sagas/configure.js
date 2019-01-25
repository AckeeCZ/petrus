import * as Consts from '../constants';
import { factoryReducer } from '../reducer';

import config from './config';
import RefreshTokensTimeout from './tokens/RefreshTokensTimeout';
import initializeSaga from './initialize';
import { isNonEmptyStr } from './utilities/is';
import validateHandlers from './utilities/validateHandlers';
import validateOAuth from './utilities/validateOAuth';

export default function configure(customParams) {
    const { handlers, options, initialState } = {
        handlers: {},
        options: {},
        ...customParams,
    };

    config.oAuth = {
        ...config.oAuth,
        ...customParams.oAuth,
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

    config.oAuth.enabled = isNonEmptyStr(config.oAuth.origin);

    validateOAuth(config.oAuth);

    validateHandlers(handlers, {
        oAuthEnabled: config.oAuth.enabled,
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
