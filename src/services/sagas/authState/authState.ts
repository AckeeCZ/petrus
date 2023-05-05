import { all, call, put } from 'redux-saga/effects';

import { fetchUser, login, logout } from 'modules/auth-session';
import { refreshTokens } from 'modules/tokens/modules/refreshment';

import { tokensSelector } from 'services/selectors';

import {
    accessTokenAvailable,
    accessTokenUnavailable,
    authSessionEnd,
    authSessionPause,
    authSessionResume,
    authSessionStart,
} from '../../actions';

import { appSelect } from 'services/utils/reduxSaga';
import { deepCircuit, simpleCircuit } from '../circuits';

function* tokenAvailabilityCircuit() {
    const tokenAvailabilityUnits = [
        {
            pattern: [login.success, refreshTokens.success],
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

export default function* authState() {
    yield all([tokenAvailabilityCircuit(), authSessionCircuit()]);
}
