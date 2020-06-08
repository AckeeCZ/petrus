import { put, take } from 'redux-saga/effects';

import { config } from 'config';

import { types, applyAccessTokenRequest, unapplyAccessTokenRequest } from '../actions';

export function* applyAccessTokenExternally(tokens) {
    if (config.tokens.applyAccessTokenExternally) {
        yield put(applyAccessTokenRequest(tokens.accessToken));
        yield take(types.APPLY_ACCESS_TOKEN_RESOLVE);
    }
}

export function* unapplyAccessTokenExternally() {
    if (config.tokens.applyAccessTokenExternally) {
        yield put(unapplyAccessTokenRequest());
        yield take(types.UNAPPLY_ACCESS_TOKEN_RESOLVE);
    }
}
