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

export class PetrusError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PetrusError';
    }
}

/**
 * TS type guard function for PetrusError.
 * @category Utilities
 */
export const isPetrusError = (error: unknown): error is PetrusError => error instanceof PetrusError;
