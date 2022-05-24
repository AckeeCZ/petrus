import { select, take, race } from 'redux-saga/effects';

import { AuthSession, apiKeys } from 'constants/index';
import { sessionStateSelector, accessTokenSelector, apiSelectorFactory } from 'services/selectors/index';
import { accessTokenAvailable, setTokens } from 'services/actions';

import { refreshTokens, refreshExpiredToken } from 'modules/tokens/modules/refreshment';

const retrieveTokensApiSelector = apiSelectorFactory(apiKeys.RETRIEVE_TOKENS);

function* preSessionResolvement() {
    const retriveTokensApi = yield select(retrieveTokensApiSelector);

    if (retriveTokensApi.success) {
        return null;
    }

    const accessToken = yield select(accessTokenSelector);

    if (accessToken) {
        return accessToken;
    }

    yield take(setTokens);

    return yield select(accessTokenSelector);
}

function* afterRefreshAccessToken() {
    const result = yield race({
        success: refreshTokens.success.type,
        failure: refreshTokens.failure.type,
    });

    if (result.failure) {
        return null;
    }

    const action = yield take(accessTokenAvailable);

    return action.payload;
}

export default function* getAccessToken() {
    let sessionState = yield select(sessionStateSelector);

    if (sessionState === AuthSession.ACTIVE) {
        yield refreshExpiredToken();
    }

    sessionState = yield select(sessionStateSelector);

    switch (sessionState) {
        case null:
            return yield preSessionResolvement();

        case AuthSession.ACTIVE:
            return yield select(accessTokenSelector);

        case AuthSession.PAUSED:
            return yield afterRefreshAccessToken();

        default:
            return null;
    }
}
