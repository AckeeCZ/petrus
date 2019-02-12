# <a name="usage-with-oauth2"></a>Usage with OAuth2

`@ackee/petrus` supports OAuth2 with following supported flows:

-   [Implicit grant flow](https://docs.gitlab.com/ee/api/oauth2.html#implicit-grant-flow)
    -   Matches with the default configuration.
    -   `origin` property is required
-   [Web application flow](https://docs.gitlab.com/ee/api/oauth2.html#web-application-flow)
    -   Additionally to the _Implicit grant flow_, you have to provide the `fetchAccessToken` method.

> ### Redirection to an authentization service
>
> A developer has to **manually redirect user to an authentization service** (e.g. `gitlab.com`). `@ackee/petrus` won't handle this for you!

---

## Table of contents

-   [Available configuration options](#available-configuration-options)
-   Examples
    -   [Implicit grant flow](#example-implicit-grant-flow)
    -   [Web application flow](#example-web-application-flow)

## Available configuration options

The defaults, you can see bellow, are configurated to handle the [Implicit grant flow](https://docs.gitlab.com/ee/api/oauth2.html#implicit-grant-flow).

```js
 {
    // your app origin, e.g. 'http://myapp.com'
    // REQUIRED
    origin: '',

    // pathname of redirect URL
    redirectPathname: '/oauth/redirect',

    /**
     * Validate current URL on initialization,
     * if the URL is valid, the 'parseRedirectUrlParams' method is called.
     * @param {Object} location
     * @return {Boolean}
     */
    validateRedirectUrl(location) {
        return location.origin === this.origin && location.pathname === this.redirectPathname;
    },
    /**
     * get search params from url
     * accepts both search and hash:
     * - /redirect?access_token=123
     * - /redirect#access_token=123
     * @param {Object} location
     * @return {Object} search params
     */
    parseRedirectUrlParams: (location) => {
        // Implementation of this function:
        // src/sagas/utilities/getSearchParams.js
    },

    /**
     * This method is called after 'parseRedirectUrlParams',
     * But only if those search params don't include entry with `accessToken` key.
     * Returns object with following required properties: `accessToken`, `expiresIn`, `refreshToken`
     * @param {Object} searchParams - search params from the redirect URL
     * @return {Object}
     */
    async fetchAccessToken(searchParams) {},

    /**
     * The method must return object with the scheme below (`token`, `expiration` properties are required).
     * This method is called when access token is available.
     * NOTE: 'expiration' must be a valid date string!!!
     * @param {Object} searchParams
     * @return {Object}
     */
    enforceAccessTokenScheme(searchParams) {
        const { accessToken, expiresIn, ...rest } = searchParams;

        return {
            ...rest,
            token: accessToken,
            // implementation in src/sagas/utilities/parseExpirationDate.js
            expiration: parseExpirationDate(expiresIn),
        };
    },

   /**
     * The method must return object with the scheme below (`token` property is required).
     * This method is called when access token is available.
     * @param {Object} searchParams
     * @return {Object}
     */
    enforceRefreshTokenScheme(searchParams) {
        const { refreshToken } = searchParams;

        return {
            token: refreshToken,
        };
    },
 }
```

The [Web application flow](https://docs.gitlab.com/ee/api/oauth2.html#web-application-flow) is also supported. You have to additionally provide the `fetchAccessToken` method, rest of the configuration remains the same.

## <a name="example-implicit-grant-flow"></a> Example - Implicit grant flow

```js
import * as Petrus from '@ackee/petrus';

// 1. Provide autheticate, refreshTokens and getAuthUser methods
const { saga, reducer } = Petrus.configure({
    oAuth: {
        origin: 'http://myapp.com',
    },
    handlers: {
        refreshTokens,
        getAuthUser,
    },
    options: {},
    initialState: {},
});
```

## <a name="example-web-application-flow"></a> Example - Web application flow

```js
import * as Petrus from '@ackee/petrus';

// 1. Provide autheticate, refreshTokens and getAuthUser methods
const { saga, reducer } = Petrus.configure({
    oAuth: {
        origin: 'http://myapp.com',
        fetchAccessToken(searchParams) {
            const { code } = searchParams;

            // the actuall API request:
            const { accessToken, refreshToken, expiresIn } = await api.get('...')

            return {
                accessToken,
                refreshToken,
                expiresIn
            }
        }
    },
    handlers: {
        refreshTokens,
        getAuthUser,
    },
    options: {},
    initialState: {}
});
```

---

### [Back to the main readme](../README.md)
