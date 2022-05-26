import type { PetrusConfig } from 'types';

import * as storageDrivers from './storageDrivers';

export const StorageDrivers = storageDrivers;

// This object is once mutated when the 'configure' ('../configure') method is called.
// On this call custom configuration is merged with default configuration.
// The final configuration is validated and then freezed.
export const config = {} as PetrusConfig;

export const getReducerKey = () => config.reducerKey;

export class PetrusError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'PetrusError';
    }
}

export * from './global';
