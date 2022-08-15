![ackee|Petrus](media/ackee_git_frontend_petrus.png)

# [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AckeeCZ/petrus/blob/master/LICENSE) [![CI Status](https://img.shields.io/travis/com/AckeeCZ/petrus.svg?style=flat)](https://travis-ci.com/AckeeCZ/petrus) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://reactjs.org/docs/how-to-contribute.html#your-first-pull-request) [![Dependency Status](https://img.shields.io/david/AckeeCZ/petrus.svg?style=flat-square)](https://david-dm.org/AckeeCZ/petrus) [![bundlephobia](https://flat.badgen.net/bundlephobia/min/@ackee/petrus)](https://bundlephobia.com/result?p=@ackee/petrus) [![bundlephobia](https://flat.badgen.net/bundlephobia/minzip/@ackee/petrus)](https://bundlephobia.com/result?p=@ackee/petrus)

# Petrus

A tool for handling token-based authentication in React/Redux/Redux-Saga applications.

It automatically refreshes access token based on provided expiration timestamp, persists its state, so the authentication session last as long as user wishes.

---

## Table of contents

-   [Installation](#installing)
<!-- -   [Usage Examples](#usage-examples) -->
-   [API](https://github.com/AckeeCZ/petrus/wiki/Exports)

---

## Installation

```bash
$ yarn add @ackee/petrus
```

### Stack Dependencies

The library required following peer dependencies:

```
 "core-js": "3.x",
 "react": "16.x | 17.x | 18.x",
 "react-redux": "7.x | 8.x",
 "redux": "4.x",
 "redux-saga": "1.x"
```

---

## Usage examples

<!-- Checkout https://codesandbox.io/docs/importing#using-githubboxcom -->

1.  [Basic configuration](https://githubbox.com/AckeeCZ/petrus/tree/master/codesandboxes/basic)
    -   Obtaining tokens with `authenticate` method by sending credentials to an endpoint from `loginRequest` Redux action.
    -   Fetching authorized user with `getAuthUser` method.
    -   Automatically refreshing `accessToken` based on provided `expiration` prop.
    -   Tokens and auth. user local persistence in IndexedDB.
    -   Using custom TS types for auth user, tokens, and credentials.

<!-- -   [Sign-in with endpoint on your backend]()
-   [Sign-in with OAuth – Implicit grant flow]()
-   [Sign-in with OAuth – Web application flow]()
    -   Additionally to the _Implicit grant flow_, you have to provide the `fetchAccessToken` method to fetch the access token after

--- -->

<!-- -   [Sign-in with endpoint]()
    -   [Sign-in with OAuth]()

> To see defaults and available configurations with examples, go [here](./docs/api.md#configure). -->
<!--
### Usage with [`@ackee/antonio`](https://github.com/AckeeCZ/antonio/tree/master/packages/@ackee/antonio-auth#requestauthheaderinterceptorrequest-request-request)

### With OAuth2

`@ackee/petrus` supports following OAuth2 flows:

-   [Implicit grant flow](https://docs.gitlab.com/ee/api/oauth2.html#implicit-grant-flow)
    -   Matches with the default configuration.
    -   `origin` property is required
-   [Web application flow](https://docs.gitlab.com/ee/api/oauth2.html#web-application-flow)
    -   Additionally to the _Implicit grant flow_, you have to provide the `fetchAccessToken` method.

See how to setup `@ackee/petrus` for these flows [here](./docs/oAuth.md). -->
