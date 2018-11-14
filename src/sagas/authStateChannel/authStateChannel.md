## `getAuthStateChannel()`

This generator function returns the always the same channel that was once initalize (with the first call) and provides following statuses.

> ## What is a status
>
> A status is a **plain object that must have a type property**. The type property is used as object's ID. Rest of the object structure is optional. Status is uses in saga channels. Channels are used for internal communication between sagas. I use term "status" to distinguish it from Redux actions. Otherwise it'd called an action.

### Available channel statuses

-   `ACCESS_TOKEN_AVAILABLE` - It's triggered any time access token becomes available (e.g. on successful login or on successful token refresh).
-   `ACCESS_TOKEN_UNAVAILABLE` - It's triggered any time access token becomes unavailable (e.g. on logout or on failed token refresh).
-   `AUTH_SESSION_START` - It's triggered once on successful login.
-   `AUTH_SESSION_END` - It's triggered once on logout.
-   `AUTH_SESSION_PAUSE` - Triggered when tokens refreshing start.
-   `AUTH_SESSION_RESUME` - Triggered when tokens refreshing successfully finished.

---

### Usage examples

#### Authorization HTTP header

```js
import { take } from 'redux-saga/effects';
import { getAuthStateChannel, statusTypes } from 'ackee-redux-token-auth';

function* channelHandler() {
    const chan = yield getAuthStateChannel();
    while (true) {
        const status = yield take(chan);

        switch (status.type) {
            case statusTypes.ACCESS_TOKEN_AVAILABLE:
                // use accessToken (status.payload) to set Authorization HTTP header
                break;

            case statusTypes.ACCESS_TOKEN_UNAVAILABLE:
                // remove the previously set Authorization HTTP header
                break;
        }
    }
}
```

#### Authorization saga

```js
import { takeEvery, fork, cancel } from 'redux-saga/effects';
import { getAuthStateChannel, statusTypes } from 'ackee-redux-token-auth';

function* authSaga() {
    // This saga start on successful login (AUTH_SESSION_START),
    // and it's cancelled on logout (AUTH_SESSION_END).
    // You can initialize here for example auth. route dependencies.
}

function* authSagaHandler() {
    const authStateChannel = yield getAuthStateChannel();
    let task;

    yield takeEvery(authStateChannel, function*(status) {
        switch (status.type) {
            case statusTypes.AUTH_SESSION_START: {
                task = yield fork(authSaga);
                break;
            }

            case statusTypes.AUTH_SESSION_END: {
                yield cancel(task);
                break;
            }
        }
    });
}
```

---

## `withAuthSession(saga)`

Or we can use `withAuthSession` helper and achieve the same behavior.

`withAuthSession` is a function, returns `undefined` or throw a `TypeError` if the first argument isn't a function.

```js
import { withAuthSession } from 'ackee-redux-token-auth';

function* authSaga() {
    // This saga start on successful login (AUTH_SESSION_START),
    // and it's cancelled on logout (AUTH_SESSION_END).
    // You can initialize here for example auth. route dependencies.
}

withAuthSession(authSaga);
```
