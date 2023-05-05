import { put, take } from 'redux-saga/effects';

import { AuthSession } from 'constants/index';
import { setTokens } from 'services/actions';
import { accessTokenSelector, apiSelectorFactory, entitiesSelector, tokensSelector } from 'services/selectors/index';

import { isTokenExpired } from 'modules/tokens/modules/refreshment';
import { refreshTokensTask } from 'modules/tokens/modules/refreshment/sagas/refreshTokens';
import { appSelect } from 'services/utils/reduxSaga';
import type { PetrusTokens } from 'types';

const retrieveTokensApiSelector = apiSelectorFactory('retrieveTokens');

function* obtainValidAccesToken() {
    const tokens = yield* appSelect(tokensSelector);

    if (!tokens) {
        return null;
    }

    if (isTokenExpired(tokens.accessToken)) {
        const refreshedTokens = yield* refreshTokensTask(tokens);

        yield put(setTokens(refreshedTokens));

        return refreshedTokens.accessToken;
    }

    return tokens.accessToken;
}

function* preSessionResolvement() {
    const retriveTokensApi = yield* appSelect(retrieveTokensApiSelector);

    if (retriveTokensApi.success) {
        return null;
    }

    const accessToken = yield* obtainValidAccesToken();

    if (!accessToken) {
        yield take(setTokens);

        return yield* appSelect(accessTokenSelector);
    }

    return accessToken;
}

function* getAccessTokenInner() {
    const { sessionState } = yield* appSelect(entitiesSelector);

    switch (sessionState) {
        case null:
            return yield* preSessionResolvement();

        case AuthSession.ACTIVE:
        case AuthSession.PAUSED:
            return yield* obtainValidAccesToken();

        default:
            return null;
    }
}

/**
 * Generator function returning PetrusTokens['accessToken'] or `null`.
 *
 * @category Redux Saga
 *
 * @example
 * ```ts
 * import { getAccessToken } from '@ackee/petrus';
 *
 * function* mySaga() {
 *     const accessToken = yield* getAccessToken();
 *
 *     console.log(accessToken);
 * }
 * ```
 */
export const getAccessToken = () => {
    // NOTE: this just for nice tsdocs output. Without this casting, the return type would include all types of delegated iteragors, so total unreadable mess.
    return getAccessTokenInner() as Generator<any, PetrusTokens['accessToken'] | null>;
};
