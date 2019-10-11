import { select, take, race } from 'redux-saga/effects';

import { AuthSession } from 'Consts/index';
import { sessionStateSelector, accessTokenSelector } from 'Services/selectors/index';
import { types } from 'Services/actions';

import { types as retrievalTypes } from 'Modules/tokens/modules/retrieval';
import { types as refreshmentTypes } from 'Modules/tokens/modules/refreshment';
import { types as authSessionTypes } from 'Modules/auth-session';

/*
    1. select sessionState
        if sessionState == null 
            wait for RETRIEVE_TOKENS_RESOLVE
                if action.payload.tokensRetrieved == false
                    -> application is NOT authorized
                else
                    result = race ACCESS_TOKEN_AVAILABLE with [FETCH_USER_FAILURE, SIGN_IN_FAILURE]
                        if result ~ failure action
                            -> application is NOT authorized
                        else 
                            -> application is authorized
*/
function* preSessionResolvement() {
    const action = yield take(retrievalTypes.RETRIEVE_TOKENS_RESOLVE);

    if (!action.payload.tokensRetrieved) {
        return null;
    }

    const result = yield race({
        accessToken: take(types.ACCESS_TOKEN_AVAILABLE),
        failure: take([authSessionTypes.FETCH_USER_FAILURE, authSessionTypes.LOGIN_FAILURE]),
    });

    if (result.accessToken) {
        return result.accessToken.payload;
    }

    return null;
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
