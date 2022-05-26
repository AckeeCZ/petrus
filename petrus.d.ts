declare module '@ackee/petrus' {
    import type { CombinedState, Reducer } from 'redux';
    import type { ActionChannelEffect, TakeEffect, CancelEffect, ForkEffect } from 'redux-saga/effects';
    import type { ApiState } from '@ackee/redux-utils';

    export enum FlowType {
        INDETERMINATE = 'indeterminate',
        ANONYMOUS = 'anonymous',
        AUTHENTICATED = 'authenticated',
    }

    export enum AuthSession {
        ACTIVE = 'ACTIVE',
        PAUSED = 'PAUSED',
        INACTIVE = 'INACTIVE',
    }

    export enum tokensPersistence {
        NONE = 'NONE',
        LOCAL = 'LOCAL',
        SESSION = 'SESSION',
    }

    export interface Token {
        token: string;
        expiration?: string;
    }

    interface TokensState {
        accessToken?: Token;
        refreshToken?: Token;
    }

    export function getAccessToken(): Generator<any, TokensState['accessToken']>;

    export interface PetrusState<User = unknown> {
        user: User;
        tokens: TokensState;

        tokensPersistence: tokensPersistence;

        sessionState: AuthSession;

        flowType: FlowType;
    }

    export type RootReducer<U = unknown> = Reducer<
        CombinedState<{
            api: Reducer<ApiState>;
            entities: PetrusState<U>;
        }>
    >;

    export type RootSaga = () => Generator<any, void, unknown>;

    export function entitiesSelector<U = any, S = any>(state: S): PetrusState<U>;

    export function apiSelector<S = any>(
        state: S,
        api: 'login' | 'fetchUser' | 'logout' | 'refreshTokens' | 'retrieveTokens',
    ): ApiState;

    export function createExpirationDate(expiresIn: number | null | undefined): string;

    export function withAuthSession(
        task: any,
    ): Generator<Generator<TakeEffect | CancelEffect | ForkEffect<unknown>, void, unknown>, void, unknown>;

    export function getAuthStateChannel(): Generator<ActionChannelEffect, any, unknown>;
}
