import { all } from 'redux-saga/effects';

import setTokensPersistence from './setTokensPersistence';
import setTokens from './setTokens';
import deleteTokens from './deleteTokens';

export default function* tokensStorage() {
    yield all([setTokensPersistence(), setTokens(), deleteTokens()]);
}
