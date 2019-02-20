# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
