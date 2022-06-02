import type { TokensPersistence } from '../../constants';
import { setTokensPersistence } from '../../actions';
import { createReducer } from '@reduxjs/toolkit';

export const createTokensPersistenceReducer = (initialState: TokensPersistence) =>
    createReducer<TokensPersistence>(initialState, b => {
        b.addCase(setTokensPersistence, (_, action) => action.payload);
    });
