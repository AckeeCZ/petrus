import { createReducer } from '@reduxjs/toolkit';
import { authSessionEnd } from 'services/actions';
import type { PetrusUser } from 'types';

import { fetchUser } from '../../actions';

export const createUserReducer = <User extends PetrusUser>(initialState: User | null) =>
    createReducer(initialState, b => {
        b.addCase(authSessionEnd, () => initialState);
        b.addCase(fetchUser.success, (_, action) => action.payload);
    });
