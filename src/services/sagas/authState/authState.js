import { put, call, all, actionChannel, select } from 'redux-saga/effects';

import { types as refreshmentTypes } from 'Modules/tokens/modules/refreshment';
import { types as authSessionTypes } from 'Modules/auth-session';

import { tokensSelector } from 'Services/selectors';

import {
    types,
    accessTokenAvailable,
    accessTokenUnavailable,
    authSessionStart,
    authSessionEnd,
    authSessionPause,
    authSessionResume,
} from '../../actions';

import { simpleCircuit, deepCircuit } from '../circuits';

function* tokenAvailabilityCircuit() {
    const tokenAvailabilityUnits = [
        {
            pattern: [authSessionTypes.LOGIN_SUCCESS, refreshmentTypes.REFRESH_TOKENS_SUCCESS],
            *task() {
                const tokens = yield select(tokensSelector);
                yield put(accessTokenAvailable(tokens.accessToken));
            },
        },
        {
            pattern: [
                refreshmentTypes.REFRESH_TOKENS_REQUEST,
                authSessionTypes.LOGOUT_SUCCESS,
                authSessionTypes.FETCH_USER_FAILURE,
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
            pattern: authSessionTypes.LOGIN_SUCCESS,
            *task() {
                yield put(authSessionStart());
            },
        },
        {
            pattern: [
                authSessionTypes.LOGOUT_SUCCESS,
                authSessionTypes.FETCH_USER_FAILURE,
                refreshmentTypes.REFRESH_TOKENS_FAILURE,
            ],
            *task() {
                yield put(authSessionEnd());
            },
        },
    ];

    const authSessionInterruptionUnits = [
        {
            pattern: refreshmentTypes.REFRESH_TOKENS_REQUEST,
            *task() {
                yield put(authSessionPause());
            },
        },
        {
            pattern: refreshmentTypes.REFRESH_TOKENS_SUCCESS,
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
