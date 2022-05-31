import { indexedDB } from './indexedDB';

export const resetStorage = {
    set: () => {},
    get: () => null,
    async remove<Key extends string>(key: Key) {
        sessionStorage.removeItem(key);
        await indexedDB.remove(key);
    },
} as const;

export type ResetStorage = typeof resetStorage;
