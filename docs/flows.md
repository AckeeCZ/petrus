## Simplified Init flow

When `@ackee/petrus`'s saga is launched the following flow will be executed:

```
dispatch RETRIEVE_TOKENS_REQUEST
    if tokens
        if tokens are expired
            refresh tokens

        set tokens (to redux store, possibly also to a persistant storage)

        if apply access token externally
            dispatch APPLY_ACCESS_TOKEN_REQUEST
            take(APPLY_ACCESS_TOKEN_RESOLVE)

        dispatch FETCH_USER_REQUEST

dispatch RETRIEVE_TOKENS_RESOLVE
```
