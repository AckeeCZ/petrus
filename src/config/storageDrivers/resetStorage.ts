import { indexedDB } from './indexedDB';

export const resetStorage = {
    set: () => {},
    get: () => null,
    async remove<Key extends string>(key: Key) {
        return indexedDB.remove(key);

        // FIXME: calling this method results in "TypeError: Illegal invocation"
        // sessionStorage.remove(key);
    },
} as const;

export type ResetStorage = typeof resetStorage;
