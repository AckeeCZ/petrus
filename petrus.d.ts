declare module '@ackee/petrus' {
    import type { ReactNode } from 'react';
    import type { ActionCreator, AnyAction, CombinedState, Reducer } from 'redux';
    import type { ActionChannelEffect, TakeEffect, CancelEffect, ForkEffect } from 'redux-saga/effects';
    import type { ApiState } from '@ackee/redux-utils';

    export interface TokensPersistence {}

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

    export const LOGIN_SUCCESS: string;
    export const LOGIN_FAILURE: string;
    export const AUTH_SESSION_START: string;
    export const AUTH_SESSION_END: string;
    export const AUTH_SESSION_PAUSE: string;
    export const AUTH_SESSION_RESUME: string;
    export const RETRIEVE_TOKENS_REQUEST: string;
    export const RETRIEVE_TOKENS_RESOLVE: string;
    export const ACCESS_TOKEN_AVAILABLE: string;
    export const ACCESS_TOKEN_UNAVAILABLE: string;
    export const UNAPPLY_ACCESS_TOKEN_REQUEST: string;

    export const loginRequest: ActionCreator<AnyAction>;
    export const logoutRequest: ActionCreator<AnyAction>;
    export const setUserWithTokens: ActionCreator<AnyAction>;
    export const checkAccessTokenExpiration: ActionCreator<AnyAction>;
    export const setTokensPersistence: ActionCreator<AnyAction>;
    export const applyAccessTokenResolve: ActionCreator<AnyAction>;
    export const unapplyAccessTokenResolve: ActionCreator<AnyAction>;
    export const terminate: ActionCreator<AnyAction>;

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

    export type RootReducer = Reducer<
        CombinedState<{
            api: Reducer<ApiState>;
            entities: PetrusState;
        }>
    >;

    export type RootSaga = () => Generator<any, void, unknown>;

    export function configure(config: {
        reducerKey?: string;
        handlers: {
            authenticate: (payload: any) => Generator<any, Pick<PetrusState, 'tokens' | 'user'>>;
            refreshTokens: (tokens: TokensState) => Generator<any, TokensState>;
            getAuthUser: (tokens: TokensState) => Generator<any, any>;
        };
        initialState?: Partial<PetrusState>;
        tokens?: {
            applyAccessTokenExternally?: boolean;
            requestDurationEstimate?: boolean;
            minRequiredExpiration?: boolean;
            checkTokenExpirationOnTabFocus?: boolean;
        };
        logger?: Pick<typeof console, 'info' | 'debug' | 'warn' | 'error'>;
    }): { saga: RootSaga; reducer: RootReducer };

    export function entitiesSelector<U = any>(): PetrusState<U>;

    export function apiSelector<S = any>(
        state: S,
        api: 'login' | 'fetchUser' | 'logout' | 'refreshTokens' | 'retrieveTokens',
    ): ApiState;

    export function Authenticated(props: {
        children: ReactNode;
        FallbackComponent?: () => JSX.Element;
        LoaderComponent?: () => JSX.Element;
    }): JSX.Element;

    export function createExpirationDate(expiresIn: number | null | undefined): string;

    export function withAuthSession(
        task: any,
    ): Generator<Generator<TakeEffect | CancelEffect | ForkEffect<unknown>, void, unknown>, void, unknown>;

    export function getAuthStateChannel(): Generator<ActionChannelEffect, any, unknown>;

    export interface StorageDrivers {
        indexedDB: {
            get(key: string): Promise<any>;
            set(key: string, value: any): Promise<void>;
            remove(key: string): Promise<void>;
        };
        sessionStorage: {
            get(key: string): void;
            set(key: string, values: any): void;
            remove(key: string): void;
        };
        reset: {
            get(): void;
            set(): void;
            remove(key: string): Promise<void>;
        };
    }
}
