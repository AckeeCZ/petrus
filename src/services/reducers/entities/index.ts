import { combineReducers } from 'redux';
import { createUserReducer } from 'modules/auth-session';
import { createTokensPersistenceReducer, createTokensReducer, TokensPersistence } from 'modules/tokens';
import type { PetrusCustomConfig, PetrusInitialState, PetrusTokens, PetrusUser } from 'types';

import { createSessionStateReducer } from './sessionState';
import { createFlowTypeReducer } from './flowType';
import { FlowType } from 'constants/index';

export default function createEntitiesReducer<User extends PetrusUser, Tokens extends PetrusTokens>(
    customInitialState: PetrusCustomConfig<User, Tokens>['initialState'],
) {
    const initState: PetrusInitialState<User, Tokens> = {
        tokensPersistence: TokensPersistence.LOCAL,
        user: null,
        tokens: null,
        sessionState: null,
        flowType: FlowType.INDETERMINATE,
        ...customInitialState,
    };

    const user = createUserReducer<User>(initState.user);
    const flowType = createFlowTypeReducer(initState.flowType);
    const sessionState = createSessionStateReducer(initState.sessionState);
    const tokens = createTokensReducer<Tokens>(initState.tokens);
    const tokensPersistence = createTokensPersistenceReducer(initState.tokensPersistence);

    return combineReducers({
        user,
        flowType,
        sessionState,
        tokens,
        tokensPersistence,
    });
}
