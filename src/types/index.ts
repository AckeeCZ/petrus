import type { IndexedDBStorage, ResetStorage, SessionStorage } from 'config/storageDrivers';
import type { AuthSession, FlowType } from 'constants/index';
import type { TokensPersistence } from 'modules/tokens/modules/storage';

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
        expiration?: string;
    } & Record<string, any>;

    refreshToken?: {
        token: string;
    } & Record<string, any>;
};

export type PetrusHandlerReturnValue<R> = R | Promise<R> | Generator<unknown, R>;

export type PetrusOAuth = {
    searchParams: Record<string, any>;
};

export interface PetrusConfig<
    User extends PetrusUser = PetrusUser,
    Tokens extends PetrusTokens = PetrusTokens,
    OAuth extends PetrusOAuth = PetrusOAuth,
    Credentials extends PetrusCredentials = PetrusCredentials,
    Logger extends PetrusLogger = PetrusLogger,
> {
    logger: Logger;

    reducerKey: string;

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
        validateRedirectUrl?: (location: Location) => boolean;

        /**
         * Parse search params from URL. It must handle both `location.search` and `location.hash`:
         * - `/oauth/redirect?access_token=123`
         * - `/oauth/redirect#access_token=123`
         * @default 'src/modules/oAuth/config/getSearchParams'
         */
        parseRedirectUrlParams?: (location: Location) => PetrusHandlerReturnValue<OAuth['searchParams']>;

        /**
         * This method is called after 'parseRedirectUrlParams', but only if those search params don't include `accessToken` property.
         */
        fetchAccessToken?: (searchParams: OAuth['searchParams']) => PetrusHandlerReturnValue<{
            accessToken: string;
            expiresIn?: number | string;
            refreshToken?: string;
        }>;

        /**
         * - It creates and `accessToken` object from provided `searchParams`.
         * - This method is called when access token is available.
         * @default 'src/modules/oAuth/config/enforceAccessTokenScheme'
         */
        enforceAccessTokenScheme?: (
            searchParams: OAuth['searchParams'],
        ) => PetrusHandlerReturnValue<Tokens['accessToken']>;

        /**
         * - It creates and `refreshToken` object from provided `searchParams`.
         * - This method is called when access token is available.
         * @default 'src/modules/oAuth/config/enforceRefreshTokenScheme'
         */
        enforceRefreshTokenScheme?: (
            searchParams: OAuth['searchParams'],
        ) => PetrusHandlerReturnValue<Tokens['refreshToken']>;

        /**
         * This is final OAuth method in this custom flow that combines the results of `enforceAccessTokenScheme` and `enforceRefreshTokenScheme` to the `Tokens` object or `null` if accessToken isn't available (for example due to authentication error).
         * @default 'src/modules/oAuth/config/processTokens'
         */
        processTokens?: (
            accessToken: Tokens['accessToken'],
            refreshToken: Tokens['refreshToken'],
        ) => PetrusHandlerReturnValue<Tokens | null>;
    };

    tokens: {
        /**
         * If true, anytime valid non-expired tokens becomes available
         * the `applyAccessTokenRequest` is dispatch. Until the `applyAccessTokenResolve` is dispatched by any external service, the auth. flow is paused.
         * This gives you the option to do something with access token externally, e.g. injected to the Authorization header.
         *
         * @default false
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

    remoteHandlers: {
        /**
         * - Called when `loginRequest` action dispatches.
         * - If returned `user` property is undefiend, the `getAuthUser` handler gets called.
         * - Optional if the oauth flow is used instead.
         */
        authenticate?: (credentails: Credentials) => PetrusHandlerReturnValue<{ user?: User | null; tokens: Tokens }>;

        /**
         * - This method is called when tokens are successfully retrieved.
         * - Or when the `authenticate` returns undefined `user` property.
         */
        getAuthUser: (tokens: Tokens) => PetrusHandlerReturnValue<User>;

        /**
         * This method is called anytime when access token is expired.
         */
        refreshTokens: (tokens: Tokens) => PetrusHandlerReturnValue<Tokens>;
    };

    mapStorageDriverToTokensPersistence: {
        [TokensPersistence.LOCAL]: IndexedDBStorage;
        [TokensPersistence.NONE]: ResetStorage;
        [TokensPersistence.SESSION]: SessionStorage;
    };
}

export interface PetrusInitialState<User extends PetrusUser, Tokens extends PetrusTokens> {
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
    tokens: Tokens | null;

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
    Tokens extends PetrusTokens = PetrusTokens,
    OAuth extends PetrusOAuth = PetrusOAuth,
    Credentials extends PetrusCredentials = PetrusCredentials,
    Logger extends PetrusLogger = PetrusLogger,
    Config extends PetrusConfig<User, Tokens, OAuth, Credentials, Logger> = PetrusConfig<
        User,
        Tokens,
        OAuth,
        Credentials,
        Logger
    >,
> {
    /**
     * @default 'auth'
     */
    reducerKey?: Config['reducerKey'];

    /**
     * @default Console
     */
    logger?: Config['logger'];

    oAuth?: Config['oAuth'];

    tokens?: Partial<Config['tokens']>;

    /**
     * Initial state of the `entities` reducer.
     */
    initialState?: Partial<PetrusInitialState<User, Tokens>>;

    handlers: Config['remoteHandlers'];

    /**
     * Set a custom storage driver for a given `TokensPersistence`.
     */
    mapStorageDriverToTokensPersistence?: Partial<Config['mapStorageDriverToTokensPersistence']>;
}
