import { entitiesReducers as authSessionReducers } from 'modules/auth-session';
import { entitiesReducers as tokensReducers } from 'modules/tokens';
import { sessionState } from './sessionState';
import { flowType } from './flowType';

const chooseState = (state, initialState) => (state === undefined ? initialState : state);

export default function createEntitiesReducer(initialState) {
    const { user, tokens, tokensPersistence } = {
        ...authSessionReducers,
        ...tokensReducers,
    };

    return function entitiesReducer(state = {}, action) {
        return {
            user: user(chooseState(state.user, initialState.user), action),
            tokens: tokens(chooseState(state.tokens, initialState.tokens), action),
            tokensPersistence: tokensPersistence(
                chooseState(state.tokensPersistence, initialState.tokensPersistence),
                action,
            ),
            sessionState: sessionState(chooseState(state.sessionState, initialState.sessionState), action),
            flowType: flowType(chooseState(state.flowType, initialState.flowType), action),
        };
    };
}
