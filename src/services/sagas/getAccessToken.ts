import { take, race } from 'redux-saga/effects';

import { AuthSession, ApiKeys } from 'constants/index';
import { entitiesSelector, accessTokenSelector, apiSelectorFactory } from 'services/selectors/index';
import { accessTokenAvailable, setTokens } from 'services/actions';

import { refreshTokens, refreshExpiredToken } from 'modules/tokens/modules/refreshment';
import { appSelect } from 'services/utils/reduxSaga';
import type { PetrusTokens } from 'types';

const retrieveTokensApiSelector = apiSelectorFactory(ApiKeys.RETRIEVE_TOKENS);

function* preSessionResolvement() {
    const retriveTokensApi = yield* appSelect(retrieveTokensApiSelector);

    if (retriveTokensApi.success) {
        return null;
    }

    const accessToken = yield* appSelect(accessTokenSelector);

    if (accessToken) {
        return accessToken;
    }

    yield take(setTokens);

    return yield* appSelect(accessTokenSelector);
}

function* afterRefreshAccessToken() {
    const effects = {
        success: refreshTokens.success,
        failure: refreshTokens.failure,
    } as const;

    const result: Partial<typeof effects> = yield race(effects);

    if (result.failure) {
        return null;
    }

    const action: ReturnType<typeof accessTokenAvailable> = yield take(accessTokenAvailable);

    return action.payload;
}

function* getAccessTokenInner() {
    const { sessionState } = yield* appSelect(entitiesSelector);

    if (sessionState === AuthSession.ACTIVE) {
        yield* refreshExpiredToken();
    }

    const { sessionState: authSessionState } = yield* appSelect(entitiesSelector);

    switch (authSessionState) {
        case null:
            return yield* preSessionResolvement();

        case AuthSession.ACTIVE:
            return yield* appSelect(accessTokenSelector);

        case AuthSession.PAUSED:
            return yield* afterRefreshAccessToken();

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
