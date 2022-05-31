import type { IndexedDBStorage, ResetStorage, SessionStorage } from 'config/storageDrivers';
import type { StorageDriver } from 'config/types';
import type { AuthSession, FlowType } from 'constants/index';
import type { TokensPersistence } from 'modules/tokens/modules/storage';
import type { PetrusRootState } from 'services/reducers';
import type { HandlerReturnValue } from './helpers';

export * from './helpers';

export type PetrusLogger = {
    error: Console['error'];
};

export type PetrusUser = any;

export type PetrusCredentials = any;

export type PetrusTokens = {
    accessToken: {
        token: string;
        /**
         * If `expiration` is omitted, then petrus won't automatically refresh the access token.
         */
        expiration?: string | null;
    } & Record<string, any>;

    refreshToken?: {
        token: string;
    } & Record<string, any>;
};

export type PetrusOAuth = {
    searchParams: Record<string, any>;
};

export interface PetrusConfig<
    User extends PetrusUser = PetrusUser,
    Credentials extends PetrusCredentials = PetrusCredentials,
    Logger extends PetrusLogger = PetrusLogger,
> {
    logger: Logger;

    selector: <AppState extends Record<string, any> = Record<string, any>>(state: AppState) => PetrusRootState;

    initialized: boolean;

    /**
     * ## Implicit grant flow
     * @example 
     ```
        import { configure } from '@ackee/petrus';
    
        // Minimal required setup:
        const { saga, reducer } = configure({
            oAuth: {
                origin: 'http://myapp.com',
            },
            handlers: {
                refreshTokens,
                getAuthUser,
            },
        });
     ```
     *  
     * ## Web application flow
     * @example 
     ```
        import { configure } from '@ackee/petrus';
    
        // Minimal required setup:
        const { saga, reducer } = configure({
            oAuth: {
                origin: 'http://myapp.com',
                *fetchAccessToken(searchParams) {
                    const { code } = searchParams;

                    // the actuall API request:
                    const { accessToken, refreshToken, expiresIn } = yield* api.get('...');

                    return {
                        accessToken,
                        refreshToken,
                        expiresIn,
                    };
                },
            },
            handlers: {
                refreshTokens,
                getAuthUser,
            },
        });
     ```
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
        validateRedirectUrl: (oAuth: PetrusConfig<User, Credentials, Logger>['oAuth'], location: Location) => boolean;

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
         * If true, anytime valid non-expired tokens becomes available
         * the `applyAccessTokenRequest` is dispatch. Until the `applyAccessTokenResolve` is dispatched by any external service, the auth. flow is paused.
         * This gives you the option to do something with access token externally, e.g. injected to the Authorization header.
         *
         * @default false
         * @deprecated
         */
        applyAccessTokenExternally: boolean;

        /**
         * If `false`, petrus won't start tokens retrieval saga automatically but it's up to you to call the `retrieveTokens` saga.
         * By calling `retrieveTokens` saga, petrus starts the authentication flow. Either it signs-in user with avail. access token or it won't if the access token is expired and couldn't be refreshed.
         * @default true
         */
        autoStartTokensRetrieval: boolean;

        /**
         * Refresh tokens `${requestDurationEstimate}`ms before token expires.
         * @default 500 // ms
         */
        requestDurationEstimate: number;

        /**
         * @default 60_000 // 1 minute
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
        authenticate?: (credentails: Credentials) => HandlerReturnValue<{ user?: User | null; tokens: PetrusTokens }>;

        /**
         * - This method is called when tokens are successfully retrieved.
         * - Or when the `authenticate` returns undefined `user` property.
         */
        getAuthUser: (tokens: PetrusTokens) => HandlerReturnValue<User>;

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

export interface PetrusEntitiesState<User extends PetrusUser> {
    /**
     * @initial TokensPersistence.LOCAL
     */
    tokensPersistence: TokensPersistence;

    /**
     * @initial null
     */
    user: User | null;

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

export interface PetrusCustomConfig<
    User extends PetrusUser = PetrusUser,
    Credentials extends PetrusCredentials = PetrusCredentials,
    Config extends PetrusConfig<User, Credentials> = PetrusConfig<User, Credentials>,
> {
    /**
     * This function must return petrus reducer from your application root state,
     * so you can set it on nested level or on different path.
     * @default (state) => state.auth
     */
    selector: Config['selector'];

    /**
     * @default Console
     */
    logger?: Config['logger'];

    oAuth?: {
        origin: Config['oAuth']['origin'];
        redirectPathname: Config['oAuth']['redirectPathname'];
        validateRedirectUrl?: Config['oAuth']['validateRedirectUrl'];
        parseRedirectUrlParams?: Config['oAuth']['parseRedirectUrlParams'];
        fetchAccessToken?: Config['oAuth']['fetchAccessToken'];
        enforceAccessTokenScheme?: Config['oAuth']['enforceAccessTokenScheme'];
        enforceRefreshTokenScheme?: Config['oAuth']['enforceRefreshTokenScheme'];
        processTokens?: Config['oAuth']['processTokens'];
    };

    tokens?: Partial<Config['tokens']>;

    /**
     * Initial state of the `entities` reducer.
     */
    initialState?: Partial<PetrusEntitiesState<User>>;

    handlers: Config['handlers'];

    /**
     * Set a custom storage driver for a given `TokensPersistence`.
     */
    mapStorageDriverToTokensPersistence?: Partial<Record<TokensPersistence, StorageDriver>>;
}
