/**
 * Tokens persistence defines how and where will be tokens stored and when they will be cleared:
 * -   `LOCAL` (default) - Tokens are stored in `IndexedDB` data storage. The state will be persisted even when the browser window is closed. An explicit action (e.g. successful sign out) is required in order to clear that state.
 * -   `SESSION` - Tokens are stored in `SessionStorage`.
 * -   `NONE` - Tokens will only be stored in Redux Store and will be cleared when the window or activity is refreshed.
 */
export enum TokensPersistence {
    NONE = 'none',
    LOCAL = 'local',
    SESSION = 'session',
}
