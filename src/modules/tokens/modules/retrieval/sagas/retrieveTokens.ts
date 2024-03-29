import { put, take } from 'redux-saga/effects';

import { config } from 'config';
import { deleteTokens, setTokens } from 'services/actions';
import { tokensPersistenceSelector } from 'services/selectors';

import { fetchUser } from 'modules/auth-session';
import { getMaybeOAuthTokens } from 'modules/oAuth';

import { isTokenExpired, refreshTokens } from '../../refreshment';
import { TokensPersistence, storageHandlers } from '../../storage';

import { appSelect } from 'services/utils/reduxSaga';
import { areTokensValid } from 'services/utils/validateTokens';
import type { PetrusTokens } from 'types';
import { retrieveTokensRequest, retrieveTokensResolve } from '../actions';

function* tokensRetrieval() {
    const tokensPersistence = yield* appSelect(tokensPersistenceSelector);

    let tokens: PetrusTokens | undefined = yield storageHandlers.retrieveTokens();

    if (!areTokensValid(tokens)) {
        tokens = undefined;
    }

    if (config.oAuth.enabled) {
        // get the fresh tokens always as first
        const tokensFromOAuth = yield* getMaybeOAuthTokens();

        if (tokensFromOAuth) {
            tokens = tokensFromOAuth;
        }
    }

    if (tokensPersistence === TokensPersistence.NONE) {
        yield put(deleteTokens());
    }

    if (!tokens || (!config.oAuth.enabled && tokensPersistence === TokensPersistence.NONE)) {
        return false;
    }

    if (isTokenExpired(tokens.accessToken)) {
        yield put(refreshTokens.request(tokens));
        // 'retrieveTokensResolve' action must be dispatched when tokens has been refreshed
        // otherwise authorizable HOC will render <Firewall/> which is wrong.
        const result: ReturnType<typeof refreshTokens.success | typeof refreshTokens.failure> = yield take([
            refreshTokens.success,
            refreshTokens.failure,
        ]);

        if (result.type === refreshTokens.failure.type) {
            return false;
        }
    } else {
        yield put(setTokens(tokens));
    }

    yield put(fetchUser.request());

    const fetchUserResultAction: ReturnType<typeof fetchUser.success | typeof fetchUser.failure> = yield take([
        fetchUser.success,
        fetchUser.failure,
    ]);

    if (fetchUserResultAction.type === fetchUser.failure.type) {
        yield put(deleteTokens());
    }

    return fetchUserResultAction.type === fetchUser.success.type;
}

function* retrieveTokensInner() {
    yield put(retrieveTokensRequest());

    const tokensRetrieved: boolean = yield tokensRetrieval();

    yield put(retrieveTokensResolve(tokensRetrieved));
}

/**
 * @category Redux Saga
 */
export function* retrieveTokens() {
    // NOTE: This is required so the tsdocs are readable
    yield* retrieveTokensInner() as Generator<any, void>;
}
