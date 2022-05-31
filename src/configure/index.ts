import { PetrusError, config, StorageDrivers } from 'config';

import { configure as oAuth } from 'modules/oAuth';
import { configure as authSession } from 'modules/auth-session';
import { configure as tokens, TokensPersistence } from 'modules/tokens';

import { createRootReducer } from 'services/reducers';
import rootSaga from 'services/sagas';
import type { PetrusCredentials, PetrusCustomConfig, PetrusUser } from 'types';

export function configure<
    User extends PetrusUser = PetrusUser,
    Credentials extends PetrusCredentials = PetrusCredentials,
    AppState extends Record<string, any> = Record<string, any>,
>(customConfig: PetrusCustomConfig<User, Credentials>) {
    if (config.initialized) {
        throw new PetrusError(`'configure' method can be called only once.`);
    }

    const oAuthConfig = oAuth(customConfig.oAuth);
    const { rootReducer, entitiesInitState } = createRootReducer<User>(customConfig.initialState);

    Object.assign(config, {
        initialized: true,

        logger: customConfig.logger || console,

        selector: (state: AppState) => state.auth,

        oAuth: oAuthConfig,

        tokens: tokens.options(customConfig.tokens),

        handlers: {
            ...authSession.handlers(customConfig.handlers, {
                oAuthEnabled: oAuthConfig.enabled,
                tokensPersistence: entitiesInitState.tokensPersistence,
            }),
            ...tokens.handlers(customConfig.handlers),
        },

        mapStorageDriverToTokensPersistence: {
            [TokensPersistence.SESSION]: StorageDrivers.sessionStorage,
            [TokensPersistence.LOCAL]: StorageDrivers.indexedDB,
            [TokensPersistence.NONE]: StorageDrivers.resetStorage,
            ...customConfig.mapStorageDriverToTokensPersistence,
        },
    });

    Object.freeze(config);

    return {
        reducer: rootReducer,
        saga: rootSaga,
    } as const;
}
