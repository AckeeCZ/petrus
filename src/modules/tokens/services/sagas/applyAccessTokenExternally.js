import { put, take } from 'redux-saga/effects';

import { config } from 'Config';

import { applyAccessTokenRequest, types } from '../actions';

export default function* applyAccessTokenExternally(tokens) {
    if (config.tokens.applyAccessTokenExternally) {
        yield put(applyAccessTokenRequest(tokens.accessToken));
        yield take(types.APPLY_ACCESS_TOKEN_RESOLVE);
    }
}
