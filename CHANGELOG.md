# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
