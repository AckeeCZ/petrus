import type { PetrusConfig } from 'types';

import { indexedDB, resetStorage, sessionStorage } from './storageDrivers';

export const storageDrivers = {
    indexedDB,
    resetStorage,
    sessionStorage,
} as const;

// This object is once mutated when the 'configure' ('../configure') method is called.
// On this call custom configuration is merged with default configuration.
// The final configuration is validated and then freezed.
export const config = {
    initialized: false,
} as PetrusConfig;

export enum PetrusErrorType {
    CONFIGURE_METHOD_CAN_BE_CALLED_ONLY_ONCE,

    INVALID_AUTHENTICATE_HANDLER,
    INVALID_GET_AUTH_USER_HANDLER,
    INVALID_REFRESH_TOKENS_HANDLER,
    INVALID_OAUTH_CONFIG,
    INVALID_TIMEOUT,
    INVALID_TOKENS,

    UNAVAILABLE_TOKENS,
    UNAVAILABLE_AUTH_USER,

    GET_AUTH_USER_FAILURE,
    LOGIN_FAILURE,
    LOGOUT_FAILURE,
    REFRESH_TOKENS_FAILURE,
    DIRECT_LOGIN_FAILURE,
    GET_OAUTH_TOKENS_FAILURE,
    SET_ACCESS_TOKEN_REFRESHMENT_TIMER_FAILURE,
    CLEAR_TOKENS_FAILURE,
    SET_TOKENS_FAILURE,
    SET_TOKENS_PERSISTENCE_FAILURE,
}

export class PetrusError<OriginalError extends Error = Error> extends Error {
    originalError: OriginalError | undefined;
    type: PetrusErrorType;

    constructor(type: PetrusErrorType, message: string, originalError?: OriginalError) {
        super(message);
        this.name = 'PetrusError';
        this.type = type;
        this.originalError = originalError;
    }
}

/**
 * TS type guard function for PetrusError.
 * @category Utilities
 */
export const isPetrusError = (error: unknown): error is PetrusError => error instanceof PetrusError;
