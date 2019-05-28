# OAuth

## How to enable OAuth flow

`OAuth` flow is enabled if `config.origin` parameter is provided. Look into `./config` directory, to see the default OAuth configuration.

## How the OAuth flow starts

`OAuth` is now enabled. Then, during tokens retrieval, is called `getOAuthTokens` saga, that returns `accessToken` and `refreshToken`. After that, the flow continues normally as without OAuth.

The process of getting those tokens is fully configurable. Even though each step has its own default method, you can easily use your own that best fit to your flow. **The `getOAuthTokens` saga just calls these methods in a certain order**, that's all it does
