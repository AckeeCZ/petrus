import { select, take, race } from 'redux-saga/effects';

import { AuthSession, apiKeys } from 'constants/index';
import { sessionStateSelector, accessTokenSelector, apiSelectorFactory } from 'services/selectors/index';
import { types } from 'services/actions';

import { types as refreshmentTypes } from 'modules/tokens/modules/refreshment';

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

    yield take(types.SET_TOKENS);

    return yield select(accessTokenSelector);
}

function* afterRefreshAccessToken() {
    const result = yield race({
        success: refreshmentTypes.REFRESH_TOKENS_SUCCESS,
        failure: refreshmentTypes.REFRESH_TOKENS_FAILURE,
    });

    if (result.failure) {
        return null;
    }

    const action = yield take(types.ACCESS_TOKEN_AVAILABLE);

    return action.payload;
}

export default function* getAccessToken() {
    const sessionState = yield select(sessionStateSelector);

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
