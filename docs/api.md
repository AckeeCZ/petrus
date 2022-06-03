# API Reference

## Table of contents

-   [configure(config)](#configure)
-   [Components](#components)
    -   Authenticated
-   [Hooks]()
    -   useAuthenticated
-   [Action creators](#action-creators)
    -   [setTokensPersistence]()
    -   [login]()
    -   terminate
    -   checkAccessTokenExpiration
    -   setUserWithTokens
    -   setTokensPersistence
    -   loginRequest
-   [Action types](#action-types)

    -   RETRIEVE_TOKENS_REQUEST
    -   RETRIEVE_TOKENS_RESOLVE

    -   LOGIN_SUCCESS
    -   LOGIN_FAILURE

    -   AUTH_SESSION_START
    -   AUTH_SESSION_PAUSE
    -   AUTH_SESSION_RESUME
    -   AUTH_SESSION_END

    -   ACCESS_TOKEN_AVAILABLE
    -   ACCESS_TOKEN_UNAVAILABLE

-   [Constants](#constants)
    -   [FlowType]()
    -   [AuthSession]()
    -   [TokensPersistence]
-   [Selectors](#selectors)
    -   [apiSelector]()
    -   [entitiesSelector]()
-   [Utilities](#utilities)
    -   [createExpirationDate]()
-   [Sagas]
    -   [getAccessToken]()
    -   [withAuthSession]()

---

## <a name="configure"></a>`configure(config: Object) => Object`

This method must be always called exactly once. It returns `saga` and `reducer`. When the saga is connected among your other sagas, then `@ackee/petrus` starts to work.

### Defaults

```js
{
    handlers: {},

    reducerKey: 'auth',

    tokens: {
        requestDurationEstimate: 500,
        minRequiredExpiration: 1000 * 60,

        // If true, anytime valid non-expired tokens becomes available
        // the `APPLY_ACCESS_TOKEN_REQUEST` is dispatch. Until the `applyAccessTokenResolve` is dispatched by any external service, the auth. flow is paused.
        // This gives you the power to do something with access token externally (e.g. `@ackee/antonio` uses this for injecting access tokne to the `Authorization` header).
        applyAccessTokenExternally: false,

        // Check if access token is expired when document visibility changes
        // from 'hidden' to 'visibile'. And it's expired, then refresh access token.
        checkTokenExpirationOnTabFocus: true,

        // If false, petrus won't start tokens retrieval saga automatically but it's up to you to call `retrieveTokens` saga.
        // By calling `retrieveTokens` saga, petrus starts the authentication flow. Either it signs-in user with avail. access token or it won't if the access token is expired and couldn't be refreshed.
        autoStartTokensRetrieval: true,
    },

    // Default value is window.console
    logger: console,

    // Initial state for entities reducer.
    // Mostly useful for changing 'tokensPersistence'.
    initialState: {
        user: null,
        tokens: {},
        tokensPersistence: TokensPersistence.LOCAL,
        sessionState: null,
        flowType: FlowType.INDETERMINATE,
    },

    oAuth: {
        // For oAuth defaults see note below.
    },

    // Set special storage drive (an object containing 3 async. methods: set, get and remove)
    // for each tokens persistence.
    mapStorageDriverToTokensPersistence: {
        [TokensPersistence.SESSION]: StorageDrivers.sessionStorage,
        [TokensPersistence.LOCAL]: StorageDrivers.indexedDB,
    },
}
```

> OAuth2 authentication is also supported, even with different flows. See more at ["Usage with OAuth"](./oAuth.md).

### Minimal required configuration

For classic (non-OAuth) flow you need to provide the following handlers:

```js
import { configure } from '@ackee/petrus';

const { saga, reducer } = configure({
    handlers: {
        authenticate: authenticateHandler,
        refreshTokens: refreshTokensHandler,
        getAuthUser: getAuthUserHandler,
    },
});
```

> **Do NOT forget to connect the `saga` and `reducer`!**
>
> The reducer must be connected under `reducerKey` (`auth` by default).

#### Handlers

1. `authenticate(credentials: any) => { user?: any, tokens: TokensShape }`

    - Called when `loginRequest(credentials)` action dispatches.
    - If `user` isn't returned, `getAuthUser` handler is called.

    #### Example

    ```js
    import { createExpirationDate } from '@ackee/petrus';

    function* authenticateHandler(credentials) {
        const { email, password } = credentials;
        const response = yield api.post('/auth/sign-in', {
            email,
            password,
        });
        const { user, tokens } = response.data;
        const { accessToken, expiresIn, refreshToken } = credentials;

        // Following scheme is required:
        return {
            user,
            tokens: {
                accessToken: {
                    token: accessToken,
                    userId: user.id,

                    // (optional) To enable auto tokens refreshing, you need to provided access token `expiration` date.
                    expiration: createExpirationDate(expiresIn * 1000),
                },
                refreshToken: {
                    token: refreshToken,
                },
            },
        };
    }
    ```

2. `refreshTokens(tokens: Object) => tokens:Object`

    This method is called anytime when access token is expired, that is when:

    - timeout for refreshing tokens is fired
    - or tokens are expired after retrieval from a local storage
    - or the `checkAccessTokenExpiration` action is dispatched and access token is expired

    Function is expected to return/or resolve with an tokens Object: (`{ [tokenName: string]: token }`)

    #### Example

    ```js
    function* refreshTokensHandler(tokens) {
        const response = yield api.post('/auth/refresh', null, {
            params: {
                token: refreshToken.token,
            },
        });

        return response.data;
    }
    ```

3. `getAuthUser(tokens: Object) => user:any`

    This method is called when tokens are successfully retrieved from a local storage.

    The function is expected to return/or resolve with a user object.

    #### Example

    ```js
    function* getAuthUserHandler(tokens) {
        const { userId } = tokens.accessToken;
        const response = yield authApi.get(config.api.user, {
            uriParams: {
                userId,
            },
        });

        return response.data;
    }
    ```

---
