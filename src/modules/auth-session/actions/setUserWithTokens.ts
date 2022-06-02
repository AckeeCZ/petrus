import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';
import type { PetrusTokens, PetrusUser } from 'types';

/**
 * If there is available an auth. user and tokens (e.g. from a user sign up),
 * this action will store these data as they would come from the `authenticate` handler.
 * Thus, the user is signed in without an additional API request required.
 *
 * Note:
 * If you dispatch this action when a user is already logged in, the logoutRequest action will be first dispatched and then the flow will continue as usual.
 *
 * @category Redux Action Creator
 *
 * @example
 *  ```ts
 *   import { put } from 'redux-saga/effects';
 *   import { setUserWithTokens } from '@ackee/petrus';
 *
 *   function* signUp({ email, password }) {
 *       const { data } = yield api.post('/auth/sign-up', {
 *           email,
 *           password,
 *       });
 *       const { user, accessToken, refreshToken, expiration } = data;
 *
 *       yield put(
 *           setUserWithTokens(user, {
 *               accessToken: {
 *                   token: accessToken,
 *                   expiration,
 *               },
 *               refreshToken: {
 *                   token: refreshToken,
 *               },
 *           }),
 *       );
 *   }
 *   ```
 */
export const setUserWithTokens = createAction(
    actionType(`SET_USER_WITH_TOKENS`),
    (user: PetrusUser, tokens: PetrusTokens) => ({
        payload: { user, tokens },
    }),
);
