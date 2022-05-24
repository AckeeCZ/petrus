import { put, take } from 'redux-saga/effects';

import { config } from 'config';

import {
    applyAccessTokenRequest,
    unapplyAccessTokenRequest,
    applyAccessTokenResolve,
    unapplyAccessTokenResolve,
} from '../actions';

export function* applyAccessTokenExternally(tokens) {
    if (config.tokens.applyAccessTokenExternally) {
        yield put(applyAccessTokenRequest(tokens.accessToken));
        yield take(applyAccessTokenResolve);
    }
}

export function* unapplyAccessTokenExternally() {
    if (config.tokens.applyAccessTokenExternally) {
        yield put(unapplyAccessTokenRequest());
        yield take(unapplyAccessTokenResolve);
    }
}
