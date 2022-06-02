import type { ActionChannelEffect } from 'redux-saga/effects';
import { put, call, all, actionChannel } from 'redux-saga/effects';

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
import { appSelect } from 'services/utils/reduxSaga';

function* tokenAvailabilityCircuit() {
    const { applyAccessTokenExternally } = config.tokens;

    const tokenAvailabilityUnits = [
        {
            pattern: applyAccessTokenExternally ? applyAccessTokenResolve : [login.success, refreshTokens.success],
            *task() {
                const tokens = yield* appSelect(tokensSelector);
                if (tokens) {
                    yield put(accessTokenAvailable(tokens.accessToken));
                }
            },
        },
        {
            pattern: [refreshTokens.request, logout.success, fetchUser.failure],
            *task() {
                if (applyAccessTokenExternally) {
                    yield* unapplyAccessTokenExternally();
                }

                yield put(accessTokenUnavailable());
            },
        },
    ];

    yield* simpleCircuit(tokenAvailabilityUnits);
}

function* authSessionCircuit() {
    const authSessionUnits = [
        {
            pattern: login.success,
            *task() {
                yield put(authSessionStart());
            },
        },
        {
            pattern: [logout.success, fetchUser.failure, refreshTokens.failure],
            *task() {
                yield put(authSessionEnd());
            },
        },
    ];

    const authSessionInterruptionUnits = [
        {
            pattern: refreshTokens.request,
            *task() {
                yield put(authSessionPause());
            },
        },
        {
            pattern: refreshTokens.success,
            *task() {
                yield put(authSessionResume());
            },
        },
    ];

    yield call(deepCircuit, [authSessionUnits[0], ...authSessionInterruptionUnits, authSessionUnits[1]]);
}

/**
 * @category Redux Saga
 */
export function* getAuthStateChannel() {
    const authStateChannel: ActionChannelEffect = yield actionChannel([
        authSessionStart,
        authSessionPause,
        authSessionResume,
        authSessionEnd,
        accessTokenAvailable,
        accessTokenUnavailable,
    ]);

    return authStateChannel;
}

export default function* authState() {
    yield all([tokenAvailabilityCircuit(), authSessionCircuit()]);
}
