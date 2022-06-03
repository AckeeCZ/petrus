/**
 * `SessionState` reflects current **auth** session state.
 *
 * -   It's initially set to `null`.
 * -   Only `AUTH_SESSION_*` actions changes its value.
 *
 * Possible states:
 *
 * -   `null` - set initially
 * -   `ACTIVE`
 *     -   set by `AUTH_SESSION_START` (login is complete - access is avail. and auth. user is fetched) and `AUTH_SESSION_RESUME` (access token refreshment has been completed) actions
 *     -   Access token is only valid in this state.
 * -   `PAUSED` - set by `AUTH_SESSION_PAUSE` (access token refreshment has started)
 * -   `INACTIVE` - set by `AUTH_SESSION_END` action (user logouts, token refreshment fails)
 */
export enum AuthSession {
    ACTIVE = 'ACTIVE',
    PAUSED = 'PAUSED',
    INACTIVE = 'INACTIVE',
}

export enum ApiKeys {
    FETCH_USER = 'fetchUser',
    LOGIN = 'login',
    LOGOUT = 'logout',
    REFRESH_TOKENS = 'refreshTokens',
    RETRIEVE_TOKENS = 'retrieveTokens',
}

/**
 * `FlowType` gives you current high-level auth. state.
 *
 *  -   `FlowType.INDETERMINATE` - Flow type hasn't been determined yet. Tokens retrieval is in process.
 *  -   `FlowType.ANONYMOUS`
 *      -   Tokens retrieval was completed, but no tokens has been found.
 *      -   Or auth session ended - `AUTH_SESSION_END` action was dispatched.
 *  -   `FlowType.AUTHENTICATED` - `AUTH_SESSION_START` action was dispatched, so valid tokens are available, authorized user successfully fetched.
 *
 * **Such a variable is useful for deciding between auth. and non-auth. endpoints.**
 */
export enum FlowType {
    /**
     * Auth user and access token might be available – `flowType` hasn't been resolved yet.
     */
    INDETERMINATE = 'indeterminate',
    /**
     * Access token isn't avail. or valid, or auth. user isn't avail.
     */
    ANONYMOUS = 'anonymous',
    /**
     * Access token is avail. and valid, and auth. user is avail.
     */
    AUTHENTICATED = 'authenticated',
}

/**
 * @ignore
 */
export const ACTION_PREFIX = '@@petrus/';
