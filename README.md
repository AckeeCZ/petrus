# ackee-redux-token-auth

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
-   [Migration guides (`1.x.x` -> `2.0.x`)](#migration-guides)

---

## <a name="installing"></a>Installing

Using npm:

```bash
$ npm install ackee-redux-token-auth
```

Using yarn:

```bash
$ yarn add ackee-redux-token-auth
```

---

## <a name="initialization"></a>Initialization

#### <a name="configure"></a>`configure(config: Object, options: Object) => void`

Sets the package configuration with an config object. Following config properties are supported:

`config`:

-   `authenticate: Function` - required
-   `refreshTokens: Function` - required
-   `getAuthUser: Function` - required
-   `shouldRefresh: Function`

`options`:

-   `tokens`
    -   `persistence: String` - [See details](#constants-tokens-persistence)
    -   `requestDurationEstimate: Number`
    -   `minRequiredExpiration: Number`

Any of the functions can also be a saga generator.

##### `authenticate(credentials: any) => { user: any, tokens: any }`

Required. This method is called when a `login(credentials)` action is dispatched. These credentials are passed to `authenticate` method.

The method is expected to return/or resolve with an Object with props `user, tokens` or throw an error. User and tokens are then stored as is to the redux state for later use (`state.auth.user`).

##### `refreshTokens(tokens: Object) => tokens:Object`

Required. This method is called when the timeout for refreshing tokens ends or when tokens are expired after retrieval from a local storage. This triggers the token-refresh process.

Function is expected to return/or resolve with an tokens Object: (`{ [tokenName: string]: token }`)

##### `getAuthUser(void) => user:any`

Required. This method is called when tokens are successfully retrieved from a local storage.

Function is expected to return/or resolve with a user object.

##### [DEPRECATED]`shouldRefresh(error: Error) => boolean`

Optional. This function is called when the `requestFn` catches an error and should decide, whether to refresh the tokens and retry the action or not.

**Default**: `() => true`.

### `saga() => ReduxSaga`

Initializes the saga handlers generator. This should be passed along with your other sagas.

### `reducer: ReduxReducer`

The lib reducer. Needs to be plugged in under the `auth` key. Reducer name is not-yet configurable.

### Initialization overview

```js
import * as ReduxAuth from 'ackee-redux-token-auth';

// 1. Provide autheticate, refreshTokens and getAuthUser methods
ReduxAuth.configure({
    authenticate,
    refreshTokens,
    getAuthUser,
});

// 2. Launch ReduxAuth.saga
function*() {
    yield all([ReduxAuth.saga()])
}

// 3. Add auth reducer
const rootReducer = combineReducers({
    auth: ReduxAuth.reducer
});
```

---

## API

### <a name="constants"></a>Constants

#### `tokens`

-   <a name="constants-tokens-persistence"></a>`persistence`

    Tokens persistence defines how and where will be tokens stored and when they will be cleared:

    -   `LOCAL` (default) - Tokens are stored in `IndexedDB`. The state will be persisted even when the browser window is closed. An explicit sign out is needed to clear that state.
    -   `SESSION` - Tokens are stored in `SessionStorage`.
    -   `NONE` - Tokens will only be stored in Redux Store and will be cleared when the window or activity is refreshed.

        Example

        ```js
        import { configure, constants } from 'ackee-redux-token-auth';

        const options = {
            tokens: {
                persistence: constants.tokens.persistence.NONE,
            },
        };

        configure(
            {
                // ...
            },
            options,
        );
        ```

### <a name="action-creators"></a>Action creators

#### `login(credentials: Object) => ReduxAction`

The `credentials` object is passed to `authenticate(credentials)` method you've provided in the [`configure`](#configure) method.

#### `logout() => ReduxAction`

Triggers a user logout. This clears the state of any auth data (tokens from local storage included).

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

### <a name="selectors"></a>Selectors

#### `authUser(state: Object) => user:any`

Gets the user returned from `authenticate` method.

#### `isLoggedIn(state: Object) => Boolean`

Returns `true` whether user is logged in, `false` otherwise.

#### `isLoggingIn(state: Object) => Boolean`

Returns `true` whether the login process is taking place, `false` otherwise.

#### `isUserFetching(state: Object) => Boolean`

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

#### [DEPRECATED] `authorizedFn(handler: Function)`

A saga wrapper for the given `handler` Function or a saga generator.

The handler is called with `{ ...tokens, user }` you returned in `configure.authenticate` and `configure.refreshTokens`.

### <a name="hoc"></a>HOC

#### `authorizable(AuthorizableComponent, Firewall, Loader) => AuthorizedComponent`

High order component that based on current state of the `auth` reducer renders one of these components:

-   `AuthorizableComponent` is rendered only if `auth.isLoggedIn` is `true` (-> app is authorized)
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

---

## <a name="migration-guides"></a>Migration guides from `1.x.x` to `2.0.x`

The `configure` method now accept an object with following changes:

1.  `refreshTokens` function is now required
2.  `getAuthUser` is a required function, that returns a user object.

The configure method should now look like this:

```js
import { configure } from 'ackee-redux-token-auth';

configure({
    autheticate,
    refreshTokens, // now required
    getAuthUser, // new method
});
```
