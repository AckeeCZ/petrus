import { createReducer } from '@reduxjs/toolkit';
import { deleteTokens, setTokens } from 'services/actions';
import type { PetrusTokens } from 'types';

export const createTokensReducer = (initState: PetrusTokens | null) =>
    createReducer(initState, b => {
        b.addCase(setTokens, (_, action) => action.payload);
        b.addCase(deleteTokens, () => initState);
    });
