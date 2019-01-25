import { put, call, all, actionChannel } from 'redux-saga/effects';

import * as types from '../../actionType';
import {
    accessTokenAvailable,
    accessTokenUnavailable,
    authSessionStart,
    authSessionEnd,
    authSessionPause,
    authSessionResume,
} from '../../actions';

import { simpleCircuit, deepCircuit } from './circuits';

function* tokenAvailabilityCircuit() {
    const tokenAvailabilityUnits = [
        {
            pattern: types.SET_AUTH_TOKENS,
            *task(action) {
                yield put(accessTokenAvailable(action.tokens.accessToken));
            },
        },
        {
            pattern: [
                types.AUTH_REFRESH_TOKEN,
                types.AUTH_LOGOUT,
                types.AUTH_LOGIN_FAILURE,
                types.FETCH_AUTH_USER_FAILURE,
            ],
            *task() {
                yield put(accessTokenUnavailable());
            },
        },
    ];

    yield call(simpleCircuit, tokenAvailabilityUnits);
}

function* authSessionCircuit() {
    const authSessionUnits = [
        {
            pattern: types.SET_AUTH_TOKENS,
            *task() {
                yield put(authSessionStart());
            },
        },
        {
            pattern: [types.AUTH_LOGOUT, types.AUTH_LOGIN_FAILURE, types.FETCH_AUTH_USER_FAILURE],
            *task() {
                yield put(authSessionEnd());
            },
        },
    ];

    const authSessionInterruptionUnits = [
        {
            pattern: types.AUTH_REFRESH_TOKEN,
            *task() {
                yield put(authSessionPause());
            },
        },
        {
            pattern: types.AUTH_REFRESH_TOKEN_SUCCESS,
            *task() {
                yield put(authSessionResume());
            },
        },
    ];

    yield call(deepCircuit, [authSessionUnits[0], ...authSessionInterruptionUnits, authSessionUnits[1]]);
}

export function* getAuthStateChannel() {
    const authStateChannel = yield actionChannel([
        types.AUTH_SESSION_START,
        types.AUTH_SESSION_PAUSE,
        types.AUTH_SESSION_RESUME,
        types.AUTH_SESSION_END,
        types.ACCESS_TOKEN_AVAILABLE,
        types.ACCESS_TOKEN_UNAVAILABLE,
    ]);

    return authStateChannel;
}

export default function*() {
    yield all([tokenAvailabilityCircuit(), authSessionCircuit()]);
}
