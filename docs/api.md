# API Reference

## Table of contents

-   [Action creators](#action-creators)
-   [Action types](#action-types)
-   [Constants](#constants)
-   [Selectors](#selectors)
-   [Utilities](#utilities)
-   [HOC](#hoc)

---

## <a name="action-creators"></a>Action creators

#### `login(credentials: Object)`

The `credentials` object is passed to `authenticate(credentials)` method you've provided in the [`configure`](../README.md#configure) method.

#### `logout()`

Triggers a user logout. This clears the state of any auth data (tokens from local storage included).

##### Example

```js
import { put } from 'redux-saga/effects';
import { actions } from '@ackee/petrus';

function* logout() {
    yield put(actions.logout());
}
```

#### `setTokensPersistence(persistence: String)`

Change tokens persistence, see [constants/tokens-persistence](#constants-tokens-persistence) for more details.

#### `setUserWithTokens(user: Object, tokens: Object)`

If you have available both an authorized user and tokens, this action will store those data and switch `isLoggedIn` flag to `true`.

This is useful when a user has been signed up and you want to take an advantage of those available data in the response (if the response include an authorized `user` and `tokens`).

##### Example

```js
import { put } from 'redux-saga/effects';
import { actions } from '@ackee/petrus';

function* signUp({ email, password }) {
    const response = yield api.post('/auth/sign-up', {
        email,
        password,
    });
    const { user, tokens } = response;

    yield put(actions.setUserWithTokens(user, tokens));
}
```

##### Notes

If you dispatch this action when a user is already logged in:

-   the `logout` action will be dispatched - therefore the auth session will ended (`AUTH_SESSION_END`)
-   only then the `setUserWithTokens` action will be processed as usual

---

## <a name="action-types"></a>Action types

#### Access token retrieval from a persistent storage

##### `RETRIEVE_TOKENS_REQUEST`

An attempt to retrieve tokens has begun. This action is dispatched immediately after @ackee/petrus saga was initialized.

##### `RETRIEVE_TOKENS_RESOLVE`

An attempt to retrieve tokens has been made. The action contains `tokensRetrieved` boolean property with is equal to the result.

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

#### Example

```js
import { put } from 'redux-saga/effects';
import { actionTypes } from '@ackee/petrus';

function* watchAuthSession() {
    yield takeEvery(actionTypes.AUTH_SESSION_START, function*(action) {
        // ...
    });
}
```

---

## <a name="constants"></a>Constants

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
        const { NONE, LOCAL } = Petrus.constants.tokens;

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

#### `isRetrievingTokens(state: Object) => Boolean`

#### Example

```js
import { select } from 'redux-saga/effects';
import * as Petrus from '@ackee/petrus';

function* selectAuthUser() {
    const authUser = yield select(Petrus.selectors.authUser);
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
import { getAuthStateChannel, actionTypes } from '@ackee/petrus';

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
import { authorizable } from '@ackee/petrus/lib/HOC';
// or import { HOC } from '@ackee/petrus';
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
> More detail description of the [Tokens management logic](../src/sagas/tokens/tokens.md).
