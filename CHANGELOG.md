# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 4.0.0-beta.18 - 2019-10-17

### Added

-   OAuth
    -   `processTokens` final step in auth. flow that combines results of `enforceAccessTokenScheme` and `enforceRefreshTokenScheme` functions to one object - tokens.

## 4.0.0-beta.17 - 2019-10-17

### Fixed

-   OAuth flow
    -   If `enforceAccessTokenScheme` returns `null`, `getOAuthTokens` returns `null`, therefore tokens won't be retrieved. This may occured when user declines permission and error is returned in redirect URI.
    -   `fromSnakeToCamelCase` util now returns 1st letter lowercased, not uppercased.

## 4.0.0-beta.16 - 2019-10-17

### Fixed

-   OAuth initialization

## 4.0.0-beta.15 - 2019-10-15

### Added

-   `entities.flowType` variable with values of `FlowType` constant.

## 4.0.0-beta.14 - 2019-10-11

### Fixed

-   `getAccessToken` - return null if `api.retrieveTokens.success && entities.sessionState === null`

## 4.0.0-beta.13 - 2019-10-11

### Added

-   `getAccessToken` generator utility

## 4.0.0-beta.12 - 2019-08-08

### Fixed

-   Fix `apiSelector`

## 4.0.0-beta.11 - 2019-08-01

### Added

-   `terminate` action that cancels all petrus sagas

## 4.0.0-beta.10 - 2019-07-29

### Fixed

-   Fix `deleteTokens` saga

## 4.0.0-beta.9 - 2019-07-29

### Fixed

-   Fix `globalEnv` for SSR.

## 4.0.0-beta.8 - 2019-07-26

### Fixed

-   Fix storage handlers saga (the `forcedPersistence` param).

## 4.0.0-beta.7 - 2019-07-26

### Added

-   Support for overriding storage drivers for specific tokens persistence. For example, you can now replace indexedDB for `LOCAL` tokens persistence by your own storage driver.

## 4.0.0-beta.6 - 2019-07-25

### Fixed

-   Add indexedDB mock

## 4.0.0-beta.3 - 2019-07-15

### Fixed

-   Fix fetch auth. user 401 error - pass refreshed tokens to `applyAccessTokenExternally` action instead of the old ones.

## 4.0.0-beta.2 - 2019-06-28

### Added

#### New public API:

-   `options.applyAccessTokenExternally: boolean` (`false` by default)
-   `APPLY_ACCESS_TOKEN_REQUEST`
-   `UNAPPLY_ACCESS_TOKEN_REQUEST`
-   `applyAccessTokenResolve(accessToken)`
-   `unapplyAccessTokenResolve()`

For more information, please checkout the [#39](https://github.com/AckeeCZ/petrus/pull/39) PR and the [docs](docs/api.md#configure).

## 4.0.0-beta.1 - 2019-06-24

-   Reduced namespace for **all** public exports:

    ```js
    // before
    import { HOC } from '@ackee/petrus';
    // -> HOC.authorizable

    // after
    import { authorizable } '@ackee/petrus';
    ```

-   Rename `verifyAccessTokenAvailability` action to `checkAccessTokenExpiration`.
-   The `authorizable` HOC doesn't pass any own props to the `AuthorizableComponent` component.
-   Reducer state is now looks like this:
    ```js
    {
        entities: {
            user: null,
            tokens: {},
            // ...
        },
        api: {
            fetchUser: {
                inProgress: false,
                success: false,
                error: '',
                cancelled: false
            },
            // ...
        }
    }
    ```
    The `api` object is build from so called api reducers created by `basicApiReducer` reducer factory from `@ackee/redux-utils` package.
-   All selectors were removed and replaced with `entitiesSelector` and `apiSelector`.
-   **The whole package is rewritten to the module/sub-module structure to be more organized and readable.**
-   Upgrade `@ackee/redux-utils` to version **`2.0.x`**.
-   Upgrade `redux-saga` to version **`1.0.x`**.
-   Add aliases.
-   Add jest environment.
-   Add `sideEffects` flag to `package.json`.

## 3.7.0 - 2019-04-13

### Added

-   `verifyAccessTokenAvailability` action creator

## 3.6.0 - 2019-04-13

### Added

-   `verifyTokenExpirationOnTabFocus` option
-   `logger` option

## 3.5.2 - 2019-03-16

### Fix

-   tokens retrieval: If retrieved tokens are expired, refresh them and now **wait for the refresh request to finish** and then fetch auth. user. In other words, user won't have to login into app so often as now.

## 3.5.1 - 2019-03-05

### Updated

-   `authorizable` HOC - render authorized content if auth. user and (newly) **tokens** are available

## 3.5.0 - 2019-02-22

### Added

-   support server-side rendering (However there's an known issue [#26](https://github.com/AckeeCZ/petrus/issues/26))

## 3.4.1 - 2019-02-20

### Fixed

-   add public export of the `createExpirationDate` utility

## 3.4.0 - 2019-02-20

### Fixed

-   retrieve tokens with enabled OAuth: take fresh tokens always first

### Added

-   `createExpirationDate` utility - create expiration date from timeout value
-   validate tokens returned by `refreshTokens` and `authenticate` (must be object including at least `accessToken` object with `token` property).

### Updated

-   move API reference and OAuth section to their own files

## 3.3.2 - 2019-02-08

### Added

-   `config.getAuthUser` method receives as first parameter `tokens` returned by `authTokens` selector

## 3.3.1 - 2019-02-07

### Fixed

-   add missing export of `setUserWithTokens` action

## 3.3.0 - 2019-02-04

### Added

-   `RETRIEVE_TOKENS_REQUEST` and `RETRIEVE_TOKENS_RESOLVE` actions.

### Removed

-   `TRIED_TO_RETRIEVE_TOKENS` action.

## 3.2.3 - 2019-02-04

### Fixed

-   [oAuth] Fix method names in oAuth default configuration and oAuth validation.
-   [oAuth] `enforceAccessTokenScheme` method - parse and validate `accessToken` value.

## 3.2.1 - 2019-01-02

### Fixed

-   Transpilation and publishing of `es/selectors.js`.

## 3.2.0 - 2019-02-01

### Added

-   `setUserWithTokens(user, tokens)` Redux action.
