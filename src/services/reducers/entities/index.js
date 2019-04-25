import user from './user';
import tokens from './tokens';
import tokensPersistence from './tokensPersistence';

const chooseState = (state, initialState) => (state === undefined ? initialState : state);

export default function createEntitiesReducer(initialState) {
    return function entitiesReducer(state, action) {
        return {
            user: user(chooseState(state.user, initialState.user), action),
            tokens: tokens(chooseState(state.tokens, initialState.tokens), action),
            tokensPersistence: tokensPersistence(
                chooseState(state.tokensPersistence, initialState.tokensPersistence),
                action,
            ),
        };
    };
}
