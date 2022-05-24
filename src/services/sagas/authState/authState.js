import { put, call, all, actionChannel, select } from 'redux-saga/effects';

import { config } from 'config';

import { refreshTokens } from 'modules/tokens/modules/refreshment';
import { unapplyAccessTokenExternally, applyAccessTokenResolve } from 'modules/tokens/modules/external';
import { login, logout, fetchUser } from 'modules/auth-session';

import { tokensSelector } from 'services/selectors';

import {
    accessTokenAvailable,
    accessTokenUnavailable,
    authSessionStart,
    authSessionEnd,
    authSessionPause,
    authSessionResume,
} from '../../actions';

import { simpleCircuit, deepCircuit } from '../circuits';

function* tokenAvailabilityCircuit() {
    const { applyAccessTokenExternally } = config.tokens;

    const tokenAvailabilityUnits = [
        {
            pattern: applyAccessTokenExternally
                ? applyAccessTokenResolve.type
                : [login.success.type, refreshTokens.success.type],
            *task() {
                const tokens = yield select(tokensSelector);
                yield put(accessTokenAvailable(tokens.accessToken));
            },
        },
        {
            pattern: [refreshTokens.request.type, logout.success.type, fetchUser.failure.type],
            *task() {
                if (applyAccessTokenExternally) {
                    yield unapplyAccessTokenExternally();
                }

                yield put(accessTokenUnavailable());
            },
        },
    ];

    yield call(simpleCircuit, tokenAvailabilityUnits);
}

function* authSessionCircuit() {
    const authSessionUnits = [
        {
            pattern: login.success.type,
            *task() {
                yield put(authSessionStart());
            },
        },
        {
            pattern: [logout.success.type, fetchUser.failure.type, refreshTokens.failure.type],
            *task() {
                yield put(authSessionEnd());
            },
        },
    ];

    const authSessionInterruptionUnits = [
        {
            pattern: refreshTokens.request.type,
            *task() {
                yield put(authSessionPause());
            },
        },
        {
            pattern: refreshTokens.success.type,
            *task() {
                yield put(authSessionResume());
            },
        },
    ];

    yield call(deepCircuit, [authSessionUnits[0], ...authSessionInterruptionUnits, authSessionUnits[1]]);
}

export function* getAuthStateChannel() {
    const authStateChannel = yield actionChannel([
        authSessionStart.type,
        authSessionPause.type,
        authSessionResume.type,
        authSessionEnd.type,
        accessTokenAvailable.type,
        accessTokenUnavailable.type,
    ]);

    return authStateChannel;
}

export default function* authState() {
    yield all([tokenAvailabilityCircuit(), authSessionCircuit()]);
}
