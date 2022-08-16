import { put, takeLeading } from 'redux-saga/effects';

import { config, isPetrusError, PetrusError, PetrusErrorType } from 'config';
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
                throw new PetrusError(
                    PetrusErrorType.INVALID_AUTHENTICATE_HANDLER,
                    `Can't login, missing the 'authenticate' handler`,
                );
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
            if (isPetrusError(e)) {
                config.logger.error(e);
                yield put(login.failure(e));
            } else {
                const error = new PetrusError(PetrusErrorType.LOGIN_FAILURE, `Failed to login user.`, e as Error);
                config.logger.error(error);
                yield put(login.failure(error));
            }
        }
    });
}
