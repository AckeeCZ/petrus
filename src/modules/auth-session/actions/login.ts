import { createApiActions } from '@ackee/redux-utils';
import { actionType } from 'services/utils';
import type { PetrusCredentials } from 'types';

export type LoginRequestPayload = PetrusCredentials;

export type LoginSuccessPayload = void;

export type LoginFailurePayload = Error;

const ACTION_TYPE_PREFIX = actionType('LOGIN');

/**
 * @ignore
 */
export const login = createApiActions<
    typeof ACTION_TYPE_PREFIX,
    LoginRequestPayload,
    LoginSuccessPayload,
    LoginFailurePayload
>(ACTION_TYPE_PREFIX);

/**
 * The credentials object is passed to the `authenticate` handler you've provided in the `configure` method.
 * @category Redux Action Creator
 * @example
 * ```ts
 * import { loginRequest } from '@ackee/petrus';
 *
 * function* login() {
 *    yield put(loginRequest({
 *        email: 'user@test.com',
 *        password: 'password123'
 *    }))
 * }
 *
 * // ...
 * // in `authenticate` handler:
 * configure({
 *     // ...
 *    handlers: {
 *    // ...
 *      authenticate: function* authenticateHandler({ email, password }) {
 *          // Use the credentials to sign-in user
 *      }
 *    }
 * })
 * ```
 */
export const loginRequest = login.request;

/**
 * @category Redux Action Type
 */
export const LOGIN_SUCCESS = login.success.type;

/**
 * @category Redux Action Type
 */
export const LOGIN_FAILURE = login.failure.type;
