## `getAuthStateChannel()`

This generator function returns the always the same channel that was once initalize and provides following actions.

### Available channel actions

`ACCESS_TOKEN_AVAILABLE` - It's triggered any time access token becomes available (e.g. on successful login or on successful token refresh), when `SET_AUTH_TOKENS` action occur.

`ACCESS_TOKEN_UNAVAILABLE` - It's triggered any time access token becomes unavailable, when one of following action occur: `AUTH_REFRESH_TOKEN, AUTH_LOGOUT, AUTH_LOGIN_FAILURE, FETCH_AUTH_USER_FAILURE`.

`AUTH_SESSION_START` - It's triggered once when tokens are set, when `SET_AUTH_TOKENS` action occurs.

`AUTH_SESSION_PAUSE` - Triggered when tokens refreshing start, when `AUTH_REFRESH_TOKEN` action occurs.

`AUTH_SESSION_RESUME` - Triggered when tokens refreshing successfully finished, when `AUTH_REFRESH_TOKEN_SUCCESS` action occurs.

`AUTH_SESSION_END` - It's triggered once when one of following actions occur: `AUTH_LOGOUT, AUTH_LOGIN_FAILURE, FETCH_AUTH_USER_FAILURE`.

---

### Usage examples

#### Authorization HTTP header

```js
import { take } from 'redux-saga/effects';
import { getAuthStateChannel, actionTypes } from 'ackee-redux-token-auth';

function* channelHandler() {
    const authStateChannel = yield getAuthStateChannel();

    yield takeEvery(authStateChannel, function*(action) {
        switch (action.type) {
            case actionTypes.ACCESS_TOKEN_AVAILABLE:
                // use accessToken (action.payload) to set Authorization HTTP header
                break;

            case actionTypes.ACCESS_TOKEN_UNAVAILABLE:
                // remove the previously set Authorization HTTP header
                break;
        }
    });
}
```

#### Authorization saga

```js
import { takeEvery, fork, cancel } from 'redux-saga/effects';
import { getAuthStateChannel, actionTypes } from 'ackee-redux-token-auth';

function* authSaga() {
    // This saga start on successful login (AUTH_SESSION_START),
    // and it's cancelled on logout (AUTH_SESSION_END).
    // You can initialize here for example auth. route dependencies.
}

// You don't have to always use authStateChannel,
// it's simpler to write it without the authStateChannel in this case.
function* authSagaHandler() {
    while (true) {
        yield take(actionTypes.AUTH_SESSION_START);

        yield race({
            task: call(authSaga),
            cancel: take(actionTypes.AUTH_SESSION_END),
        });
    }
}
```

---

## `withAuthSession(saga)`

Or we can use `withAuthSession` blocking effect and achieve the same behavior.

```js
import { withAuthSession } from 'ackee-redux-token-auth';

function* authSaga() {
    // This saga start on successful login (AUTH_SESSION_START),
    // and it's cancelled on logout (AUTH_SESSION_END).
    // You can initialize here for example auth. route dependencies.
}

export default function*() {
    // withAuthSession is a blocking effect,
    // use it with fork() effect to make it unblocking
    yield withAuthSession(authSaga);
}
```
