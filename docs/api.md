# API Reference

## Table of contents

-   [configure(config)](#configure)
-   [Components](#components)
-   [Action creators](#action-creators)
-   [Action types](#action-types)
-   [Constants](#constants)
-   [Selectors](#selectors)
-   [Utilities](#utilities)
-   [HOC](#hoc)

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

1. `authenticate(credentials: any) => { user: any, tokens: TokensShape }`

    This method is called when the `loginRequest(credentials)` action is dispatched. The credentials object is passed to `authenticate` method where you handles the authentication and returns object with `user` and `tokens`.

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

## <a name="components"></a>Components

### `Authenticated`

Component that based on current state of the `auth` reducer renders one of these components:

-   `children` are rendered only if an authorized user was fetched (-> `state.auth.user`)
-   `FallbackComponent` is rendered if application isn't authorized
-   `Loader` (optional) is renderer whenever the app can't determinate if it's authorized or not (e.g. when app is loading and it doesn't know yet if tokens are available or not)

```js
import React from 'react';
import { Authenticated } from '@ackee/petrus';
import MyLoginForm from './MyLoginForm';

const MyLoader = () => <div>Loading...</div>;

const MyComponent = () => (
    <Authenticated FallbackComponent={MyLoginForm} Loader={MyLoader}>
        <div>Private content</div>
    </Authenticated>
);
```

## <a name="action-creators"></a>Action creators

#### `loginRequest(credentials: Object)`

The `credentials` object is passed to `authenticate(credentials)` method you've provided in the [`configure`](../README.md#configure) method.

#### `logoutRequest()`

Triggers a user logout. This deletes tokens from a local storage and any auth. data from the reducer.

##### Example

```js
import { put } from 'redux-saga/effects';
import { logoutRequest } from '@ackee/petrus';

function* logout() {
    yield put(logoutRequest());
}
```

#### `setTokensPersistence(persistence: TokensPersistence.SESSION)`

Change tokens persistence, see [constants/tokens-persistence](#constants-tokens-persistence) for more details.

#### `setUserWithTokens(user: any, tokens: Object)`

If there is available an authorized `user` and `tokens` (e.g. from a user sign up), this action will store these data as they would come from the `authenticate` method. Thus, the user is signed in without an additional API request required.

##### Example

```js
import { put } from 'redux-saga/effects';
import { setUserWithTokens } from '@ackee/petrus';

function* signUp({ email, password }) {
    const response = yield api.post('/auth/sign-up', {
        email,
        password,
    });
    const { user, tokens } = response;

    yield put(setUserWithTokens(user, tokens));
}
```

##### Notes

If you dispatch this action when a user is already logged in, the `logoutRequest` action will be first dispatched and then the flow will continue as usual.

#### `checkAccessTokenExpiration()`

This action will trigger a saga that checks if the access token is expired. If so, tokens are going to be refreshed.

### Apply access token externally

**These actions are handled only if the `tokens.applyAccessTokenExternally` option is `true`.**

#### `applyAccessTokenResolve()`

`@ackee/petrus` dispatches `applyAccessTokenRequest(accessToken)` action when access token becomes available (during retrieval from persistent storage, tokens refreshment or login). Until `applyAccessTokenResolve` action is dispatched, the auth. flow is paused and any external service can do something the the `accessToken`.

#### `unapplyAccessTokenResolve()`

When access token becomes unavailable, `@ackee/petrus` dispatches `applyAccessTokenRequest()` action. Now the auth. flow is still in authorized state, until any external service dispatches the `unapplyAccessTokenResolve` action.

#### `terminate()`

Calls `cancel` redux saga effect on root Petrus saga and therefore end all infinite loops within.

---

## <a name="action-types"></a>Action types

#### Access token retrieval from a persistent storage

##### `RETRIEVE_TOKENS_REQUEST`

This action is triggered right before tokens retrieval from a local storage begins.

##### `RETRIEVE_TOKENS_RESOLVE`

This action contains `payload.tokensRetrieved` flag with the tokens retrieval result.

### Apply access token externally

**These actions are dispatched only if the `tokens.applyAccessTokenExternally` option is `true`.**

##### `APPLY_ACCESS_TOKEN_REQUEST`

See `applyAccessTokenResolve` action.

##### `UNAPPLY_ACCESS_TOKEN_REQUEST`

See `unapplyAccessTokenResolve` action.

#### Access token flow

##### `ACCESS_TOKEN_AVAILABLE`

When the access token becomes available, this action is dispatched (on `LOGIN_SUCCESS` and `REFRESH_TOKENS_SUCCESS`).

##### `ACCESS_TOKEN_UNAVAILABLE`

Access token becomes unavailable on logout or when tokens refreshment start.

It's guaranteed that the `ACCESS_TOKEN_UNAVAILABLE` action will be dispatched only once after `ACCESS_TOKEN_AVAILABLE`.

#### Authentication session flow

##### `AUTH_SESSION_START`

Once a user has been successfully logged in, this action is dispatched. It's guaranteed that `AUTH_SESSION_END` must be triggered first before another `AUTH_SESSION_START` trigger.

##### `AUTH_SESSION_PAUSE`

This action is triggered on the access token refreshment start.

##### `AUTH_SESSION_RESUME`

If access token refreshment was successful, `AUTH_SESSION_RESUME` is triggered. It's guaranteed it will be dispatched only after `AUTH_SESSION_PAUSE` action.

##### `AUTH_SESSION_END`

The `AUTH_SESSION_END` action is triggered on `AUTH_LOGOUT_SUCCESS` or `REFRESH_TOKENS_FAILURE`.

#### Example

```js
import { put } from 'redux-saga/effects';
import { AUTH_SESSION_START } from '@ackee/petrus';

function* watchAuthSession() {
    yield takeEvery(AUTH_SESSION_START, function* (action) {
        // ...
    });
}
```

#### Login

##### `LOGIN_SUCCESS`

Triggered on successful login.

##### `LOGIN_FAILURE`

Triggered on failed login.

##### Example

```js
function* handleLogin(action) {
    // dispatch login request to @ackee/petrus
    yield put(loginRequest(action.data));

    // wait for the request to resolve
    const result = yield take([LOGIN_SUCCESS, LOGIN_FAILURE]);

    // and then do something (e.g. display login error, redirect user to auth. content)
}
```

---

## <a name="constants"></a>Constants

#### `TokensPersistence`

Tokens persistence defines how and where will be tokens stored and when they will be cleared:

-   `LOCAL` (default) - Tokens are stored in `IndexedDB` data storage. The state will be persisted even when the browser window is closed. An explicit action (e.g. successful sign out) is required in order to clear that state.
-   `SESSION` - Tokens are stored in `SessionStorage`.
-   `NONE` - Tokens will only be stored in Redux Store and will be cleared when the window or activity is refreshed.

##### Example - override the default `tokensPersistence` value

```js
import { configure, TokensPersistence } from '@ackee/petrus';

const { saga, reducer } = configure({
    // ...
    initialState: {
        tokensPersistence: TokensPersistence.NONE,
    },
});
```

##### Example - set tokens persistence dynamically

```js
import { put } from 'redux-saga/effects';
import { setTokensPersistence, TokensPersistence } from '@ackee/petrus';

function* disableTokensPersistence() {
    yield put(setTokensPersistence(TokensPersistence.NONE));
}

function* enableTokensPersistence() {
    yield put(setTokensPersistence(TokensPersistence.LOCAL));
}
```

#### `SessionState`

`SessionState` reflects current **auth** session state.

-   It's initially set to `null`.
-   Only `AUTH_SESSION_*` actions changes its value.

Possible states:

-   `null` - set initially
-   `ACTIVE`
    -   set by `AUTH_SESSION_START` (login is complete - access is avail. and auth. user is fetched) and `AUTH_SESSION_RESUME` (access token refreshment has been completed) actions
    -   Access token is only valid in this state.
-   `PAUSED` - set by `AUTH_SESSION_PAUSE` (access token refreshment has started)
-   `INACTIVE` - set by `AUTH_SESSION_END` action (user logouts, token refreshment fails)

##### Example

```js
import { select, takeEvery } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { SessionState, entitiesSelector, getAuthStateChannel } from '@ackee/petrus';

const currenSessionStateSelector = createSelector(entitiesSelector, entities => entities.sessionState);

function* sessionStateChanged(action) {
    const currentSessionState = yield select(currenSessionStateSelector);

    switch (currentSessionState) {
        case SessionState.ACTIVE:
            console.log(`Auth session has started or was resumed after token refreshment.`);
            break;

        case SessionState.PAUSED:
            console.log(`Auth session has been paused due to token refreshment.`);
            break;

        case SessionState.INACTIVE:
            console.log(`Auth session has been ended for various reasons.`);
            break;

        default:
            console.log(`Session state hasn't been set yet.`);
    }
}

export default function* () {
    const authStateChannel = yield getAuthStateChannel();

    yield takeEvery(authStateChannel, sessionStateChanged);
}
```

#### `FlowType`

`FlowType` gives you current high-level auth. state.

-   `FlowType.INDETERMINATE` - Flow type hasn't been determined yet. Tokens retrieval is in process.
-   `FlowType.ANONYMOUS`
    -   Tokens retrieval was completed, but no tokens has been found.
    -   Or auth session ended - `AUTH_SESSION_END` action was dispatched.
-   `FlowType.AUTHENTICATED` - `AUTH_SESSION_START` action was dispatched, so valid tokens are available, authorized user successfully fetched.

> **Such a variable is incredibly useful for deciding between auth. and non-auth. endpoints.**

---

### <a name="selectors"></a>Selectors

#### `entitiesSelector(state: Object) => entities:object`

#### Example

```js
import { select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { entitiesSelector } from '@ackee/petrus';

const authUserSelector = createSelector(entitiesSelector, entities => entities.user);

function* selectAuthUser() {
    const authUser = yield select(authUserSelector);
    // ...
}
```

#### `apiSelector(state: Object, apiKey: String) => basicApiReducer:object`

#### Example

```js
import { select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import { apiSelector } from '@ackee/petrus';

const fetchUserSelector = createSelector(apiSelector, api => api.fetchUser);

function* selectFetchUser() {
    const { inProgress, success, error } = yield select(fetchUserSelector);
    // ...
}
```

---

## <a name="utilities"></a>Utilities

#### <a name="with-auth-session"></a>`withAuthSession(fn: Function) => void`

A generator function that receives any function as 1st parameter. The provided function will be launched on `AUTH_SESSION_START` action and cancelled on `AUTH_SESSION_END`.
Note that `withAuthSession` is a blocking task (if you need to make it non-blocking one, use it with `fork` effect).

##### Example

```js
import { withAuthSession } from '@ackee/petrus';

function* myAuthSaga() {}

export default function* () {
    yield withAuthSession(myAuthSaga);
    // non-blocking version: yield fork(withAuthSession, myAuthSaga);
}
```

#### <a name="get-auth-state-channel"></a>`getAuthStateChannel(void) => channel`

A generator function that returns [action channel](https://github.com/redux-saga/redux-saga/blob/master/docs/advanced/Channels.md#using-channels) with following available actions:

-   `ACCESS_TOKEN_AVAILABLE`
-   `ACCESS_TOKEN_UNAVAILABLE`
-   `AUTH_SESSION_START`
-   `AUTH_SESSION_PAUSE`
-   `AUTH_SESSION_RESUME`
-   `AUTH_SESSION_END`

##### Example

```js
import { takeEvery } from 'redux-saga/effects';
import { getAuthStateChannel, ACCESS_TOKEN_AVAILABLE, ACCESS_TOKEN_UNAVAILABLE } from '@ackee/petrus';

function* logOutEveryAuthStateStep() {
    const authStateChannel = yield getAuthStateChannel();

    yield takeEvery(authStateChannel, function* (action) {
        switch (action.type) {
            case ACCESS_TOKEN_AVAILABLE: {
                const accessToken = action.payload;
                // do something with accessToken
                break;
            }

            case ACCESS_TOKEN_UNAVAILABLE:
                break;
        }
    });
}
```

#### <a name="create-expiration-date"></a>`createExpirationDate(expiresIn: Number) => date string`

Creates an access token expiration date from expiration timeout value.
A expiration date is equal to `Date.now() + expiresIn`.

> Note that `expiresIn` must be in **miliseconds**.

If invalid value is passed to the function, an type error is thrown.

##### Paramaters

-   `expiresIn: Number|null|undefined` in ms

##### Returns

-   `ISOStringDate|null`

##### Examples

Convert `3600` in seconds as `expiresIn` property to `expiration` date.

```js
import { createExpirationDate } from '@ackee/petrus';

const expiresIn = 3600;
const expirationDate = createExpirationDate(3600 * 1000);
// expiratioDate will be in following format: "2019-02-19T21:02:57.970Z"

// valid:
createExpirationDate('3600000');
createExpirationDate(null);
createExpirationDate(undefined);

// invalid:
createExpirationDate('foo');
createExpirationDate('foo123');
```

#### `getAccessToken(void): accessToken|null`

Generator function returning `acccessToken` or `null`. The `accessToken` value is equal to that one you returned in `tokens` object from `authenticate` and `refreshTokens` methods.

You can call `getAccessToken` anytime and it always resolves as follow:

```
- if sessionState is null
    if api.retrieveTokens.success
        return null
    wait for RETRIEVE_TOKENS_RESOLVE
        if action.payload.tokensRetrieved === false
            return null
        else
            result = race(ACCESS_TOKEN_AVAILABLE, [FETCH_USER_FAILURE, SIGN_IN_FAILURE])

            if result === ACCESS_TOKEN_AVAILABLE
                return accessToken
            else
                return null

- else if sessionState is ACTIVE
    return accessToken

- else if sessionState is PAUSED
    const result = race(REFRESH_TOKENS_SUCCESS, REFRESH_TOKENS_FAILURE)

    if result === REFRESH_TOKENS_SUCCESS
        return accessToken
    else
        return null

- else
    return null
```

##### Example

```js
import { getAccessToken } from '@ackee/petrus';

function* mySaga() {
    const accessToken = yield getAccessToken();

    console.log(accessToken);
}
```

### <a name="hoc"></a>HOC

#### `authorizable(AuthorizableComponent, Firewall, Loader) => AuthorizedComponent`

> `authorizable` HOC will be deprecated soon. We suggest using `Authenticated` component instead

High order component that based on current state of the `auth` reducer renders one of these components:

-   `AuthorizableComponent` it is rendered only if an authorized user had been fetched (-> `state.auth.user`)
-   `Firewall` is rendered if application isn't authorized
-   `Loader` (optional) is renderer whenever the app can't determinate if it's authorized or not (e.g. when app is loading and it doesn't know yet if tokens are available or not)

##### Example

```js
import React from 'react';
import { authorizable } from '@ackee/petrus';

const AuthContent = <div>User is logged in</div>;
const Firewall = <div>Please login</div>;
const Loader = <div>Loading...</div>;

const AuthorizedComponent = authorizable(AuthContent, Firewall, Loader);

export default AuthorizedComponent;
```
