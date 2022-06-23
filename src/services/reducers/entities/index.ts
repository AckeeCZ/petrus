import { combineReducers } from 'redux';
import { createUserReducer } from 'modules/auth-session';
import { createTokensPersistenceReducer, createTokensReducer, TokensPersistence } from 'modules/tokens';
import type { PetrusCustomConfig, PetrusEntitiesState } from 'types';

import { createSessionStateReducer } from './sessionState';
import { createFlowTypeReducer } from './flowType';
import { FlowType } from 'constants/index';

export default function createEntitiesReducer(customInitialState: PetrusCustomConfig['initialState']) {
    const initState: PetrusEntitiesState = {
        tokensPersistence: TokensPersistence.LOCAL,
        user: null,
        tokens: null,
        sessionState: null,
        flowType: FlowType.INDETERMINATE,
        ...customInitialState,
    };

    const user = createUserReducer(initState.user);
    const flowType = createFlowTypeReducer(initState.flowType);
    const sessionState = createSessionStateReducer(initState.sessionState);
    const tokens = createTokensReducer(initState.tokens);
    const tokensPersistence = createTokensPersistenceReducer(initState.tokensPersistence);

    const reducer = combineReducers({
        user,
        flowType,
        sessionState,
        tokens,
        tokensPersistence,
    });

    return {
        reducer,
        initState,
    } as const;
}
