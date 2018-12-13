![ackee|Petrus](https://img.ack.ee/ackee/image/github/js)

# Petrus

The library aims to handle authentication logic with token based flow.

### Main features

-   **automatically refresh access token** before it becomes expired
-   **persisting tokens state** in local or session storage (optional)
-   automatically **fetching an authorized user** after successful tokens retrieval from a storage
-   simple API for auth state management: [`getAuthStateChannel`](#get-auth-state-channel), [`withAuthSession`](#with-auth-session)

> ### Requirements
>
> The library works best with React apps that use **Redux and Redux Saga** (since the authentication logic is heavily integrated with both these libraries).

---

## Table of contents

-   [Installing](#installing)
-   [Initialization](#initialization)
-   [API](#api)
    -   [Constants](#constants)
    -   [Action creators](#action-creators)
    -   [Action types](#action-types)
    -   [Selectors](#selectors)
    -   [Utilities](#utilities)
    -   [HOC](#hoc)

---

## <a name="installing"></a>Installing

Using yarn:

```bash
$ yarn add @ackee/petrus
```

Using npm:

```bash
$ npm i -S @ackee/petrus
```

---

## <a name="initialization"></a>Initialization

#### <a name="configure"></a>`configure(config: Object) => Object`

Sets the package configuration with an config object. Following config properties are supported:

##### paramaters

-   `config.handlers`: (all handlers are required)

    -   [required] `authenticate(credentials: any) => { user: any, tokens: any }`

        Required. This method is called when a `login(credentials)` action is dispatched. These credentials are passed to `authenticate` method.

        The method is expected to return/or resolve with an Object with props `user, tokens` or throw an error. User and tokens are then stored as is to the redux state for later use (`state.auth.user`).

    -   [required] `refreshTokens(tokens: Object) => tokens:Object`

        Required. This method is called when the timeout for refreshing tokens ends or when tokens are expired after retrieval from a local storage. This triggers the token-refresh process.

        Function is expected to return/or resolve with an tokens Object: (`{ [tokenName: string]: token }`)

    -   [required] `getAuthUser(void) => user:any`

        Required. This method is called when tokens are successfully retrieved from a local storage.

        Function is expected to return/or resolve with a user object.

    Any of the functions can also be a saga generator.

-   `config.options`:

    Defaults:

    ```js
    {
        reducerKey: 'auth',
        tokens: {
            requestDurationEstimate: 500,
            minRequiredExpiration: 1000 * 60,
        }
    }
    ```

-   `config.initialState`:

    Reducer initial state has these defaults:

    ```js
    {
        user: null,
        isLoggedIn: false,
        isLoggingIn: false,
        loginError: null,
        tokens: {},
        isRefreshing: false,
        isUserFetching: false,
        triedToRetrieveTokens: false,
        tokensPersistence: 'LOCAL',
    }
    ```

##### returns

Returns object with `saga` and `reducer` props.

-   `saga() => ReduxSaga` - Initializes the saga handlers generator. This should be passed along with your other sagas.

-   `reducer: ReduxReducer` - The lib reducer. Needs to be plugged in under the `options.reducerKey` value, default is `auth`.

---

### Initialization overview

Minimal required configuration:

```js
import * as Petrus from '@ackee/petrus';

// 1. Provide autheticate, refreshTokens and getAuthUser methods
const { saga, reducer } = Petrus.configure({
    handlers: {
        authenticate,
        refreshTokens,
        getAuthUser,
    },
    options: {},
    initialState: {}
});

// 2. Launch ReduxAuth.saga
function*() {
    yield all([saga()])
}

// 3. Add auth reducer
const rootReducer = combineReducers({
    auth: reducer
});
```

---

## API

### <a name="action-creators"></a>Action creators

#### `login(credentials: Object)`

The `credentials` object is passed to `authenticate(credentials)` method you've provided in the [`configure`](#configure) method.

#### `logout()`

Triggers a user logout. This clears the state of any auth data (tokens from local storage included).

#### `setTokensPersistence(persistence)`

Change tokens persistence, see [constants/tokens-persistence](#constants-tokens-persistence) for more details.

---

### <a name="action-types"></a>Action types

#### Access token flow

##### `ACCESS_TOKEN_AVAILABLE`

Access token becomes available when one of following events successfully finished: login, local tokens retrieval or tokens refreshment.
It's guaranteed that `ACCESS_TOKEN_UNAVAILABLE` action will be dispatched first, before another trigger of `ACCESS_TOKEN_AVAILABLE`.

##### `ACCESS_TOKEN_UNAVAILABLE`

Access token becomes unavailable on logout or when tokens refreshment start. It's also guaranteed that `ACCESS_TOKEN_AVAILABLE` action will be dispatched first, before another trigger of `ACCESS_TOKEN_UNAVAILABLE`.

#### Authentication session flow

##### `AUTH_SESSION_START`

Once the application has available valid access token, this action is dispatched. It's guaranteed that `AUTH_SESSION_END` must be triggered first before another trigger.

##### `AUTH_SESSION_PAUSE`

The action is triggered on start of access token refreshment.

##### `AUTH_SESSION_RESUME`

If access token refreshment was successful, `AUTH_SESSION_RESUME` is triggered. It's guaranteed it will be dispatched only after `AUTH_SESSION_PAUSE` action.

##### `AUTH_SESSION_END`

If access token refreshment fails or `AUTH_LOGOUT` action§ is triggered, `AUTH_SESSION_END` is triggered.

---

### <a name="constants"></a>Constants

#### `tokens`

-   <a name="constants-tokens-persistence"></a>`persistence`

    Tokens persistence defines how and where will be tokens stored and when they will be cleared:

    -   `LOCAL` (default) - Tokens are stored in `IndexedDB`. The state will be persisted even when the browser window is closed. An explicit sign out is needed to clear that state.
    -   `SESSION` - Tokens are stored in `SessionStorage`.
    -   `NONE` - Tokens will only be stored in Redux Store and will be cleared when the window or activity is refreshed.

        Example - overide default `tokensPersistence`

        ```js
        import * as Petrus from '@ackee/petrus';

        Petrus.configure({
            // ...
            initialState: {
                tokensPersistence: Petrus.constants.tokens.persistence.NONE,
            },
        });
        ```

        Example - set tokens persistence dynamically

        ```js
        import { put } from 'redux-saga/effects';
        import * as Petrus from '@ackee/petrus';

        const { setTokensPersistence } = Petrus.actions;
        const { NONE, LOCAL } from = Petrus.constants.tokens;

        function* disableTokensPersistence() {
            yield put(setTokensPersistence(NONE));
        }

        function* enableTokensPersistence() {
            yield put(setTokensPersistence(LOCAL));
        }
        ```

---

### <a name="selectors"></a>Selectors

#### `authUser(state: Object) => user:any`

Gets the user returned from `authenticate` method.

#### `isLoggedIn(state: Object) => Boolean`

Returns `true` whether user is logged in, `false` otherwise.

#### `isLoggingIn(state: Object) => Boolean`

Returns `true` whether the login process is taking place, `false` otherwise.

#### `isUserFetching(state: Object) => Boolean`

#### `tokensPersistence(state: Object) => String`

Get current tokens persistence value, see [constants/tokens-persistence](#constants-tokens-persistence) for more details.

---

### <a name="utilities"></a>Utilities

#### <a name="with-auth-session"></a>`withAuthSession(fn: Function) => void`

A generator function that receives any function as 1st parameter. The provided function will be launched on `AUTH_SESSION_START` action and cancelled on `AUTH_SESSION_END`.
Note that `withAuthSession` is a blocking task (if you need to make it non-blocking one, use it with `fork` effect).

##### Example

```js
import { withAuthSession } from 'ackee-redux-token-auth';

function* myAuthSaga() {}

export default function*() {
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
import { getAuthStateChannel, actionTypes } from 'ackee-redux-token-auth';

function* logOutEveryAuthStateStep() {
    const authStateChannel = yield getAuthStateChannel();

    yield takeEvery(authStateChannel, function*(action) {
        switch (action.type) {
            case actionTypes.ACCESS_TOKEN_AVAILABLE: {
                const accessToken = action.payload;
                // do something with accessToken
                break;
            }

            case actionTypes.ACCESS_TOKEN_UNAVAILABLE:
                break;
        }
    });
}
```

### <a name="hoc"></a>HOC

#### `authorizable(AuthorizableComponent, Firewall, Loader) => AuthorizedComponent`

High order component that based on current state of the `auth` reducer renders one of these components:

-   `AuthorizableComponent` it is rendered only if an authorized user had been fetched (-> `state.auth.user`)
-   `Firewall` is rendered if application isn't authorized
-   `Loader` (optional) is renderer whenever the app can't determinate if it's authorized or not (e.g. when app is loading and it doesn't know yet if tokens are available or not)

##### Example

```js
import React from 'react';
import { authorizable } from 'ackee-redux-token-auth/lib/HOC';
// or import { HOC } from 'ackee-redux-token-auth';
// and then HOC.authorizable(...);

const AuthContent = <div>User is logged in</div>;
const Firewall = <div>Please login</div>;
const Loader = <div>Loading...</div>;

const AuthorizedComponent = authorizable(AuthContent, Firewall, Loader);

export default AuthorizedComponent;
```

---

> ### Tokens management logic
>
> More detail description of the [Tokens management logic](https://gitlab.ack.ee/Web/token-auth/blob/master/src/sagas/tokens/tokens.md).
