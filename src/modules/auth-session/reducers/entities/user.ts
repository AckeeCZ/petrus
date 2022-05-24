import { createReducer } from '@reduxjs/toolkit';
import { authSessionEnd } from 'services/actions';

import { fetchUser } from '../../actions';

const initialState = null;

export const user = createReducer(initialState, b => {
    b.addCase(authSessionEnd, () => initialState);
    b.addCase(fetchUser.success, (_, action) => action.payload);
});
