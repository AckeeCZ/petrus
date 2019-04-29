import { all } from 'redux-saga/effects';

import withAuthSession from 'Services/sagas/withAuthSession';

import refreshTokens from './refreshTokens';
import checkAccessTokenExpiration from './checkAccessTokenExpiration';
import documentVisibility from './documentVisibility';
import setTokens from './setTokens';
import deleteTokens from './deleteTokens';

function* authSaga() {
    yield all([deleteTokens(), checkAccessTokenExpiration(), documentVisibility()]);
}

export default function*() {
    yield all([setTokens(), refreshTokens(), withAuthSession(authSaga)]);
}
