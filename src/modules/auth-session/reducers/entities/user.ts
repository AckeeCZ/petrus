import { createReducer } from '@reduxjs/toolkit';
import { types as globalTypes } from 'services/actions';

import { fetchUser } from '../../actions';

const initialState = null;

export const user = createReducer(initialState, b => {
    /* @ts-expect-error */
    b.addCase(globalTypes.AUTH_SESSION_END, () => initialState);
    b.addCase(fetchUser.success, (_, action) => action.payload);
});
