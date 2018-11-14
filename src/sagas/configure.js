import { logger } from '../config';
import config from './config';
import * as Consts from '../constants';
import RefreshTokensTimeout from './tokens/RefreshTokensTimeout';

const defaultOptions = {
    tokens: {
        ...RefreshTokensTimeout.options,
        persistence: Consts.tokens.persistence.LOCAL,
    },
};

const isNotFn = val => typeof val !== 'function';

export const configure = (customConfig = {}, customOptions = {}) => {
    const { authenticate, refreshTokens, shouldRefresh, getAuthUser } = customConfig;

    config.options = {
        ...defaultOptions,
        ...customOptions,
        tokens: {
            ...defaultOptions.tokens,
            ...customOptions.tokens,
        },
    };

    if (isNotFn(authenticate)) {
        config.remoteLogin = credentials => {
            logger.error(`Cannot authenticate use with ${credentials}: Supply authenticate function first.`);
            return {
                user: null,
                tokens: {},
            };
        };
    } else {
        config.remoteLogin = authenticate;
    }

    if (isNotFn(refreshTokens)) {
        config.remoteRefreshTokens = tokens => {
            logger.error('Cannot refresh tokens. No refresh tokens fn supplied.');
            return tokens;
        };
    } else {
        config.remoteRefreshTokens = refreshTokens;
    }

    if (isNotFn(shouldRefresh)) {
        config.detectShouldRefresh = error => !!error;
    } else {
        config.detectShouldRefresh = shouldRefresh;
    }

    if (isNotFn(getAuthUser)) {
        config.remoteGetAuthUser = () => {
            if (config.options.tokens.persistence === Consts.tokens.persistence.LOCAL) {
                logger.error(
                    `'getAuthUser' is not a function. Tokens persistence is set to 'local', you must provide function for fetching authorized user.`,
                );
            }
        };
    } else {
        config.remoteGetAuthUser = getAuthUser;
    }
};
