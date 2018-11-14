# Tokens

This directory contains logic for **storing and retrieving tokens** to and from a local storage and **setting timeout for refreshing tokens** before they expire.

## How does it work

1. ### `tryToRetrieveTokens.js`

    - retrieve tokens from a local storage
    - if tokens exist and aren't expired
        - send tokens to Redux store (dispatch `SET_AUTH_TOKENS` action)
        - fetch auth. user (use `getAuthUser` function)
    - if tokens exist, but are expired, refresh them

    Since this triggers auth. flow, this saga should be initialized as last one.

2. ### `tokens.js`

    This saga stores tokens and sets timeout for their refreshing on `SET_AUTH_TOKENS`. And on `AUTH_LOGOUT`, it's going to clear the tokens tokens and the timeout.

3. ### `RefreshTokensTimeout.js`

    #### Options


    ```js
    {
        requestDurationEstimate: 500, // 0.5s
        minRequiredExpiration: 1000 * 60, // 60s
    }
    ```

    ##### `requestDurationEstimate`
    - Type: `Number`
    - Default: `500` (ms)
    - Description: Value that decrease the timeout for refreshing tokens (i.e. how much time does it probably take to refresh tokens).

    ##### `minRequiredExpiration`
    - Type: `Number`
    - Default: `1000 * 60` (ms)
    - Description: The token's expiration property must be equal or greater than this value, otherwise an error will be thrown. This prevents to set a too low timeout.


    #### Methods

    - `setTimeout(tokens)`
    - `clearTimeout()`
    - `validateExpiration(tokens)`

    #### Usage

    ```js
    const refreshTokensTimeout = new RefreshTokensTimeout({
        // I am optimistic that my API request
        // for refreshing tokens won't take longer than 400ms.
        requestDurationEstimate: 400,
    });

    const timeoutChannel = refreshTokensTimeout.setTimeout(tokens);

    yield takeEvery(timeoutChannel, function*() {
        // timeout has elapsed, tokens need to be refreshed
        yield put(refreshTokens());
    });

    // See the 'tokens.js' file for full real usage.
    ```

4. ### `storageHandlers.js`

    Storage handlers choose storage type based on the `persistance` option.

    #### Tokens Persistance

    - `LOCAL` - `IndexedDB` storage (through `localforage` API)
    - `SESSION` - `sessionStorage`
    - `NONE` - Remove tokens from both storages and don't store tokens anymore (only in local state).

    #### Methods

    - `storeTokens(tokens)`
    - `retrieveTokens()`
    - `clearTokens()`
