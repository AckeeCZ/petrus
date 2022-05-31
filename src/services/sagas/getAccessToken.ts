import { take, race } from 'redux-saga/effects';

import { AuthSession, ApiKeys } from 'constants/index';
import { entitiesSelector, accessTokenSelector, apiSelectorFactory } from 'services/selectors/index';
import { accessTokenAvailable, setTokens } from 'services/actions';

import { refreshTokens, refreshExpiredToken } from 'modules/tokens/modules/refreshment';
import { appSelect } from 'services/utils/reduxSaga';

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

export default function* getAccessToken() {
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
