![ackee|Petrus](assets/ackee_git_frontend_petrus.png)

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AckeeCZ/petrus/blob/master/LICENSE) [![CI Status](https://img.shields.io/travis/com/AckeeCZ/petrus.svg?style=flat)](https://travis-ci.com/AckeeCZ/petrus) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request) [![Dependency Status](https://img.shields.io/david/AckeeCZ/petrus.svg?style=flat-square)](https://david-dm.org/AckeeCZ/petrus)

# Petrus

The library aims to handle authentication logic with token based flow.

### Main features

-   **automatically refresh access token** before it becomes expired
-   **persisting tokens state** in local or session storage (optional)
-   automatically **fetching an authorized user** after successful tokens retrieval from a storage
-   simple API for auth state management: [`getAuthStateChannel`](./docs/api.md#get-auth-state-channel), [`withAuthSession`](./docs/api.md#with-auth-session)

> ### Requirements
>
> The library works best with React apps that use **Redux and Redux Saga** (since the authentication logic is heavily integrated with both these libraries).

---

## Table of contents

-   [Installing](#installing)
-   [Initialization](#initialization)
-   [Usage with OAuth2](./docs/oAuth.md)
-   [API Reference](./docs/api.md#api)
    -   [Action creators](./docs/api.md#action-creators)
    -   [Action types](./docs/api.md#action-types)
    -   [Constants](./docs/api.md#constants)
    -   [Selectors](./docs/api.md#selectors)
    -   [Utilities](./docs/api.md#utilities)
    -   [HOC](./docs/api.md#hoc)

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

## <a name="initialization"></a>Initialization

#### <a name="configure"></a>`configure(config: Object) => Object`

Sets the package configuration with an config object. Following config properties are supported:

##### paramaters

-   `config.handlers`:

    -   `authenticate(credentials: any) => { user: any, tokens: any }`

        Required. This method is called when a `login(credentials)` action is dispatched. These credentials are passed to `authenticate` method.

        The method is expected to return/or resolve with an Object with props `user, tokens` or throw an error. User and tokens are then stored as is to the redux state for later use (`state.auth.user`).

    -   `refreshTokens(tokens: Object) => tokens:Object`

        Required. This method is called when the timeout for refreshing tokens ends or when tokens are expired after retrieval from a local storage. This triggers the token-refresh process.

        Function is expected to return/or resolve with an tokens Object: (`{ [tokenName: string]: token }`)

    -   `getAuthUser(void) => user:any`

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
        },

        // Check if access token is expired when document visibility changes
        // from 'hidden' to 'visibile'. And it's expired, then refresh access token.
        verifyTokenExpirationOnTabFocus: true,

        logger: console,
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
        isRetrievingTokens: false,
        tokensPersistence: 'LOCAL',
    }
    ```

-   `config.oAuth`:

    OAuth2 authentication is also supported, even with different flows. See more at ["Usage with OAuth"](./docs/oAuth.md).

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
