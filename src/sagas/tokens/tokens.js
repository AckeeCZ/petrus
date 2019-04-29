// export default function* tokensActionsHandlers() {
//     const { requestDurationEstimate, minRequiredExpiration } = config.options.tokens;

//     const refreshTokensTimeout = new RefreshTokensTimeout({
//         requestDurationEstimate,
//         minRequiredExpiration,
//     });

//     yield all([
//         takeEvery(SET_AUTH_TOKENS, setTokensHandler, refreshTokensTimeout),

//         // NOTE: AUTH_REFRESH_TOKEN_FAILURE must be also included,
//         // because if expired tokens are retrieved from a local storage,
//         // Neither ACCESS_TOKEN_AVAILABLE will be dispatched, nor ACCESS_TOKEN_UNAVAILABLE
//         takeEvery([ACCESS_TOKEN_UNAVAILABLE, AUTH_REFRESH_TOKEN_FAILURE], clearTokensHandler, refreshTokensTimeout),
//     ]);
// }
