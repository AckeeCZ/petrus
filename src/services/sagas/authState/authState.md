## Auth state

### Usage examples

#### Authorization saga

```js
import { takeEvery, fork, cancel } from 'redux-saga/effects';
import { actionTypes } from 'ackee-redux-token-auth';

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

export default function* () {
    // withAuthSession is a blocking effect,
    // use it with fork() effect to make it unblocking
    yield withAuthSession(authSaga);
}
```
