import { put, takeLeading } from 'redux-saga/effects';

import { config, PetrusError } from 'config';
import { setTokens } from 'services/actions';
import { validateTokens } from 'services/utils';
import { applyAccessTokenExternally } from 'modules/tokens/modules/external';

import { fetchUser, login } from '../actions';
import type { PetrusTokens, PetrusUser } from 'types';

function* resolveAuthUser(tokens: PetrusTokens, user?: PetrusUser): Generator<any, PetrusUser> {
    return user ? user : yield config.handlers.getAuthUser(tokens);
}

export default function* loginHandler() {
    yield takeLeading(login.request, function* (action) {
        try {
            const { authenticate } = config.handlers;

            if (!authenticate) {
                throw new PetrusError(`Can't login, missing the 'authenticate' handler`);
            }

            const {
                user,
                tokens,
            }: {
                user?: PetrusUser;
                tokens: PetrusTokens;
            } = yield authenticate(action.payload);

            validateTokens(tokens);
            yield put(setTokens(tokens));
            yield* applyAccessTokenExternally(tokens);

            const authUser = yield* resolveAuthUser(tokens, user);
            yield put(fetchUser.success(authUser));

            yield put(login.success());
        } catch (e) {
            const error = e as Error;
            config.logger.error(new PetrusError(`User login failed: ${error.toString()}`));
            yield put(login.failure(error));
        }
    });
}
