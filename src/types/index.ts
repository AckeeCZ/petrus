import type { IndexedDBStorage, ResetStorage, SessionStorage } from 'config/storageDrivers';
import type { AuthSession, FlowType } from 'constants/index';
import type { TokensPersistence } from 'modules/tokens/modules/storage';
import type { PetrusRootState } from 'services/reducers';
import type { HandlerReturnValue } from './helpers';
import type { StorageDriver } from './storageDriver';

export * from './helpers';

/**
 * @ignore
 */
export interface ConfigurePetrusUser {}

/**
 * @ignore
 */
export interface ConfigurePetrusCredentials {}

/**
 * @ignore
 */
export interface ConfigurePetrusTokens {}

/**
 * @ignore
 */
export interface ConfigurePetrusAppRootState {}

export type PetrusUser = ConfigurePetrusUser extends { value: unknown } ? ConfigurePetrusUser['value'] : any;

export type PetrusCredentials = ConfigurePetrusCredentials extends { value: unknown }
    ? ConfigurePetrusCredentials['value']
    : void;

export interface Tokens {
    accessToken: {
        token: string;
        /**
         * If `expiration` is omitted, then petrus won't automatically refresh the access token.
         */
        expiration?: string | null;
    };

    refreshToken?: {
        token: string;
    };
}

export type PetrusTokens = ConfigurePetrusTokens extends { value: Tokens } ? ConfigurePetrusTokens['value'] : Tokens;

/**
 * @ignore
 */
export type AppRootState = ConfigurePetrusAppRootState extends { value: unknown }
    ? ConfigurePetrusAppRootState['value']
    : any;

export type PetrusOAuth = {
    searchParams: Record<string, any>;
};

export type PetrusLogger = {
    error: Console['error'];
    warn: Console['warn'];
};

export interface PetrusConfig {
    logger: PetrusLogger;

    selector: (state: AppRootState) => PetrusRootState;

    /**
     * @ignore
     */
    initialized: boolean;

    /**
     * ## Implicit grant flow
     * @example
     *```ts
     *   import { configure } from '@ackee/petrus';
     *
     *   // Minimal required setup:
     *   const { saga, reducer } = configure({
     *       oAuth: {
     *           origin: 'http://myapp.com',
     *       },
     *       handlers: {
     *           refreshTokens,
     *           getAuthUser,
     *       },
     *   });
     *```
     *
     * ## Web application flow
     * @example
     * ```ts
     *   import { configure } from '@ackee/petrus';
     *
     *   // Minimal required setup:
     *   const { saga, reducer } = configure({
     *      oAuth: {
     *           origin: 'http://myapp.com',
     *           *fetchAccessToken(searchParams) {
     *                const { code } = searchParams;
     *
     *               // the actuall API request:
     *               const { accessToken, refreshToken, expiresIn } = yield* api.get('...');
     *
     *              return {
     *                   accessToken,
     *                   refreshToken,
     *                   expiresIn,
     *               };
     *           },
     *       },
     *       handlers: {
     *           refreshTokens,
     *           getAuthUser,
     *       },
     *   });
     * ```
     *
     */
    oAuth: {
        enabled: boolean;

        /**
         * Origin of your app: `window.location.origin`
         * @default ''
         */
        origin: string;

        /**
         * Pathname of redirect URL
         * @default '/oauth/redirect'
         */
        redirectPathname: string;

        /**
         * Validate the current URL on initialization,
         * if the URL is valid, the 'parseRedirectUrlParams' method is called.
         * @default 'src/modules/oAuth/config/validateRedirectUrl'
         */
        validateRedirectUrl: (oAuth: PetrusConfig['oAuth'], location: Location) => boolean;

        /**
         * Parse search params from URL. It must handle both `location.search` and `location.hash`:
         * - `/oauth/redirect?access_token=123`
         * - `/oauth/redirect#access_token=123`
         * @default 'src/modules/oAuth/config/getSearchParams'
         */
        parseRedirectUrlParams: (location: Location) => HandlerReturnValue<PetrusOAuth['searchParams']>;

        /**
         * This method is called after 'parseRedirectUrlParams', but only if those search params don't include `accessToken` property.
         */
        fetchAccessToken:
            | ((searchParams: PetrusOAuth['searchParams']) => HandlerReturnValue<{
                  accessToken: string;
                  expiresIn?: number | string;
                  refreshToken?: string;
              }>)
            | (() => void);

        /**
         * - It creates and `accessToken` object from provided `searchParams`.
         * - This method is called when access token is available.
         * @default 'src/modules/oAuth/config/enforceAccessTokenScheme'
         */
        enforceAccessTokenScheme: (
            searchParams: PetrusOAuth['searchParams'],
        ) => HandlerReturnValue<PetrusTokens['accessToken']>;

        /**
         * - It creates and `refreshToken` object from provided `searchParams`.
         * - This method is called when access token is available.
         * @default 'src/modules/oAuth/config/enforceRefreshTokenScheme'
         */
        enforceRefreshTokenScheme: (
            searchParams: PetrusOAuth['searchParams'],
        ) => HandlerReturnValue<PetrusTokens['refreshToken']>;

        /**
         * This is final OAuth method in this custom flow that combines the results of `enforceAccessTokenScheme` and `enforceRefreshTokenScheme` to the `PetrusTokens` object or `null` if accessToken isn't available (for example due to authentication error).
         * @default 'src/modules/oAuth/config/processTokens'
         */
        processTokens: (
            accessToken: PetrusTokens['accessToken'],
            refreshToken: PetrusTokens['refreshToken'],
        ) => HandlerReturnValue<PetrusTokens | null>;
    };

    tokens: {
        /**
         * If `false`, petrus won't start tokens retrieval saga automatically but it's up to you to call the `retrieveTokens` saga.
         * By calling `retrieveTokens` saga, petrus starts the authentication flow. Either it signs-in user with avail. access token or it won't if the access token is expired and couldn't be refreshed.
         * @default true
         */
        autoStartTokensRetrieval: boolean;

        /**
         * Refresh tokens `${requestDurationEstimate}`ms before token expires.
         * @default 120_000 // 2 minute
         */
        requestDurationEstimate: number;

        /**
         * @default 120_000 // 2 minute
         */
        minRequiredExpiration: number;

        /**
         * Check if access token is expired when document visibility changes from 'hidden' to 'visibile'.
         * And if it's expired, then refresh access token.
         * @default true
         */
        checkTokenExpirationOnTabFocus: boolean;
    };

    handlers: {
        /**
         * - Called when `loginRequest` action dispatches.
         * - If returned `user` property is undefiend, the `getAuthUser` handler gets called.
         * - Optional if the oauth flow is used instead.
         */
        authenticate?: (
            credentails: PetrusCredentials,
        ) => HandlerReturnValue<{ user?: PetrusUser | null; tokens: PetrusTokens }>;

        /**
         * - This method is called when tokens are successfully retrieved.
         * - Or when the `authenticate` returns undefined `user` property.
         */
        getAuthUser: (tokens: PetrusTokens) => HandlerReturnValue<PetrusUser>;

        /**
         * This method is called anytime when access token is expired.
         */
        refreshTokens: (tokens: Required<PetrusTokens>) => HandlerReturnValue<PetrusTokens>;
    };

    mapStorageDriverToTokensPersistence: {
        [TokensPersistence.LOCAL]: IndexedDBStorage;
        [TokensPersistence.NONE]: ResetStorage;
        [TokensPersistence.SESSION]: SessionStorage;
    };
}

export interface PetrusEntitiesState {
    /**
     * @initial TokensPersistence.LOCAL
     */
    tokensPersistence: TokensPersistence;

    /**
     * @initial null
     */
    user: PetrusUser | null;

    /**
     * @initial null
     */
    tokens: PetrusTokens | null;

    /**
     * @initial null
     */
    sessionState: AuthSession | null;

    /**
     * @initial FlowType.INDETERMINATE
     */
    flowType: FlowType;
}

export interface PetrusCustomConfig {
    /**
     * This function must return petrus reducer from your application root state,
     * so you can set it on nested level or on different path.
     * @default (state) => state.auth
     */
    selector: PetrusConfig['selector'];

    /**
     * @default Console
     */
    logger?: PetrusConfig['logger'];

    oAuth?: {
        origin: PetrusConfig['oAuth']['origin'];
        redirectPathname: PetrusConfig['oAuth']['redirectPathname'];
        validateRedirectUrl?: PetrusConfig['oAuth']['validateRedirectUrl'];
        parseRedirectUrlParams?: PetrusConfig['oAuth']['parseRedirectUrlParams'];
        fetchAccessToken?: PetrusConfig['oAuth']['fetchAccessToken'];
        enforceAccessTokenScheme?: PetrusConfig['oAuth']['enforceAccessTokenScheme'];
        enforceRefreshTokenScheme?: PetrusConfig['oAuth']['enforceRefreshTokenScheme'];
        processTokens?: PetrusConfig['oAuth']['processTokens'];
    };

    tokens?: Partial<PetrusConfig['tokens']>;

    /**
     * Initial state of the `entities` reducer.
     */
    initialState?: Partial<PetrusEntitiesState>;

    handlers: PetrusConfig['handlers'];

    /**
     * Set a custom storage driver for a given `TokensPersistence`.
     */
    mapStorageDriverToTokensPersistence?: Partial<Record<TokensPersistence, StorageDriver>>;
}
