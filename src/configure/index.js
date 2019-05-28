import { PetrusError, config } from 'Config';

import { configure as oAuth } from 'Modules/oAuth';
import { configure as authSession } from 'Modules/auth-session';
import { configure as tokens, tokensPersistenceInitialState } from 'Modules/tokens';

import createRootReducer from 'Services/reducers';
import rootSaga from 'Services/sagas';

config.initialized = false;

export default function configure(customConfig = {}) {
    if (config.initialized) {
        throw new PetrusError(`'configure' method can be called only once.`);
    }

    // get default  tokens persistence from tokens reducer initial state
    const initialState = tokens.initialState(customConfig.initialState);
    const tokensPersistence = initialState.tokensPersistence || tokensPersistenceInitialState;

    const oAuthEnabled = customConfig.oAuth && customConfig.oAuth.enabled;

    Object.assign(config, {
        initialized: true,

        logger: customConfig.logger || console,
        reducerKey: customConfig.reducerKey || 'auth',

        oAuth: oAuth(customConfig.oAuth),

        tokens: tokens.options(customConfig.tokens),

        remoteHandlers: {
            ...authSession.handlers(customConfig.handlers, {
                oAuthEnabled,
                tokensPersistence,
            }),
            ...tokens.handlers(customConfig.handlers),
        },
    });

    Object.freeze(config);

    return {
        reducer: createRootReducer(initialState),
        saga: rootSaga,
    };
}
