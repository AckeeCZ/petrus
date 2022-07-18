import { PetrusError, config, storageDrivers } from 'config';

import { configure as oAuth } from 'modules/oAuth';
import { configure as authSession } from 'modules/auth-session';
import { configure as tokens, TokensPersistence } from 'modules/tokens';

import { createRootReducer, PetrusRootState } from 'services/reducers';
import rootSaga from 'services/sagas';
import type { AppRootState, PetrusCustomConfig } from 'types';

/**
 * @category Configure
 * @example
 * ```ts
 *   interface Credentials {
 *       email: string;
 *       password: string;
 *   }
 *   interface UserInfo {
 *       id: string;
 *       name: string;
 *   }
 *
 *   type RootState = ReturnType<typeof rootReducer>;
 *
 *   declare module '@ackee/petrus' {
 *           interface ConfigurePetrusCredentials {
 *               value: Credentials;
 *           }
 *
 *           interface ConfigurePetrusUser {
 *               value: UserInfo;
 *           }
 *
 *           interface ConfigurePetrusAppRootState {
 *               value: BackgroundRootState;
 *           }
 *   }
 *
 *   export const { reducer, saga } = configure({
 *       selector: state => state.auth,
 *       handlers: {
 *           authenticate(credentials: PetrusCredentials) {
 *               const user: PetrusUser | undefined = {
 *                   id: '1',
 *                   name: 'Bob',
 *               };
 *
 *               const tokens: PetrusTokens = {
 *                   accessToken: {
 *                       token: '...',
 *                       expiration: '...',
 *                   },
 *                   refreshToken: {
 *                       token: '...',
 *                   },
 *               };
 *
 *               return {
 *                   user,
 *                   tokens,
 *               };
 *           },
 *           refreshTokens(tokens: Required<PetrusTokens>) {
 *               const freshTokens: PetrusTokens = {
 *                   accessToken: {
 *                       token: '...',
 *                       expiration: '...',
 *                   },
 *                   refreshToken: {
 *                       token: '...',
 *                   },
 *               };
 *
 *               return freshTokens;
 *           },
 *           getAuthUser(tokens: PetrusTokens) {
 *               const user: PetrusUser = {
 *                   id: '1',
 *                   name: 'Bob',
 *               };
 *
 *               return user;
 *           },
 *       },
 *   });
 * ```
 */
export function configure(customConfig: PetrusCustomConfig) {
    if (config.initialized) {
        throw new PetrusError(`'configure' method can be called only once.`);
    }

    const oAuthConfig = oAuth(customConfig.oAuth);
    const { rootReducer, entitiesInitState } = createRootReducer(customConfig.initialState);

    Object.assign(config, {
        initialized: true,

        logger: customConfig.logger ?? console,

        selector: customConfig.selector ?? ((state: AppRootState): PetrusRootState => state.auth),

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
            [TokensPersistence.SESSION]: storageDrivers.sessionStorage,
            [TokensPersistence.LOCAL]: storageDrivers.indexedDB,
            [TokensPersistence.NONE]: storageDrivers.resetStorage,
            ...customConfig.mapStorageDriverToTokensPersistence,
        },
    });

    Object.freeze(config);

    return {
        reducer: rootReducer,
        saga: rootSaga,
    } as const;
}
