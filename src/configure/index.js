import { PetrusError, config, StorageDrivers } from 'config';

import { configure as oAuth } from 'modules/oAuth';
import { configure as authSession } from 'modules/auth-session';
import { configure as tokens, tokensPersistenceInitialState, TokensPersistence } from 'modules/tokens';

import createRootReducer from 'services/reducers';
import rootSaga from 'services/sagas';

config.initialized = false;

export default function configure(customConfig = {}) {
    if (config.initialized) {
        throw new PetrusError(`'configure' method can be called only once.`);
    }

    // get default  tokens persistence from tokens reducer initial state
    const initialState = tokens.initialState(customConfig.initialState);
    const tokensPersistence = initialState.tokensPersistence || tokensPersistenceInitialState;

    const oAuthConfig = oAuth(customConfig.oAuth);

    Object.assign(config, {
        initialized: true,

        logger: customConfig.logger || console,
        reducerKey: customConfig.reducerKey || 'auth',

        oAuth: oAuthConfig,

        tokens: tokens.options(customConfig.tokens),

        remoteHandlers: {
            ...authSession.handlers(customConfig.handlers, {
                oAuthEnabled: oAuthConfig.enabled,
                tokensPersistence,
            }),
            ...tokens.handlers(customConfig.handlers),
        },

        mapStorageDriverToTokensPersistence: {
            [TokensPersistence.SESSION]: StorageDrivers.sessionStorage,
            [TokensPersistence.LOCAL]: StorageDrivers.indexedDB,
            [TokensPersistence.NONE]: StorageDrivers.reset,
            ...customConfig.mapStorageDriverToTokensPersistence,
        },
    });

    Object.freeze(config);

    return {
        reducer: createRootReducer(initialState),
        saga: rootSaga,
    };
}
