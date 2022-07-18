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
/* @ts-expect-error */
export const loginRequest = (payload: LoginRequestPayload) => login.request(payload);

/**
 * @category Redux Action Type
 */
export const loginReset = login.reset;

/**
 * Triggered on successful login.
 *
 * @category Redux Action Type
 *
 * @example
 * ```ts
 * function* handleLogin() {
 *    // dispatch login request to '@ackee/petrus'
 *    yield put(loginRequest({
 *        email: 'user@test.com',
 *        password: 'supersecret',
 *    }));
 *
 *    // wait for the request to resolve
 *    const result = yield take([LOGIN_SUCCESS, LOGIN_FAILURE]);
 *
 *    // and then do something (e.g. display login error, redirect user to auth. content)
 * }
 * ```
 */
export const LOGIN_SUCCESS = login.success.type;

/**
 *
 * Triggered on failed login.
 * @category Redux Action Type
 */
export const LOGIN_FAILURE = login.failure.type;
