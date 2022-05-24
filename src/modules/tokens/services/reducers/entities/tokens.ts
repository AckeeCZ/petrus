import { createReducer } from '@reduxjs/toolkit';
import { deleteTokens, setTokens } from 'services/actions';

// TODO:
const initialState: any = {};

export const tokens = createReducer(initialState, b => {
    b.addCase(setTokens, (_, action) => action.payload);
    b.addCase(deleteTokens, () => initialState);
});
