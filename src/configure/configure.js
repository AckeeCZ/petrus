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

    config.initialized = true;
    config.tokensKey = customConfig.tokensKey || 'tokens';
    config.logger = customConfig.logger || console;

    config.oAuth = oAuth(customConfig.oAuth);

    config.options = {
        reducerKey: 'auth',
        verifyTokenExpirationOnTabFocus: true,
        ...customConfig.options,
        tokens: tokens.options(customConfig.options),
    };

    const initialState = tokens.initialState(customConfig.initialState);

    const tokensPersistence = initialState.tokensPersistence || tokensPersistenceInitialState;
    const oAuthEnabled = customConfig.oAuth && customConfig.oAuth.enabled;

    config.remoteHandlers = {
        ...authSession.handlers(customConfig.handlers, {
            oAuthEnabled,
            tokensPersistence,
        }),
        ...tokens.handlers(customConfig.handlers),
    };

    return {
        reducer: createRootReducer(initialState),
        saga: rootSaga,
    };
}
