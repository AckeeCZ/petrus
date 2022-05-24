import { TokensPersistence } from '../../constants';
import { setTokensPersistence } from '../../actions';
import { createReducer } from '@reduxjs/toolkit';

export const initialState = TokensPersistence.LOCAL;

export const tokensPersistence = createReducer<TokensPersistence>(initialState, b => {
    b.addCase(setTokensPersistence, (_, action) => action.payload);
});
