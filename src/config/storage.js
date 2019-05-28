import { openDB } from 'idb';

import { globalEnv } from './global';

const noop = () => {};

const sessionStorageMock = {
    removeItem: noop,
    setItem: noop,
    getItem: noop,
};

const DATABASE_NAME = '@ackee/petrus';
const DATABASE_VERSION = 1;
const DATABASE_STORE_NAME = 'keyvaluepairs';

const db = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(nextDb) {
        nextDb.createObjectStore(DATABASE_STORE_NAME);
    },
});

export const storage = {
    session: globalEnv.sessionStorage || sessionStorageMock,
    indexedDB: {
        async get(key) {
            return (await db).get(DATABASE_STORE_NAME, key);
        },
        async set(key, val) {
            return (await db).put(DATABASE_STORE_NAME, val, key);
        },
        async remove(key) {
            return (await db).delete(DATABASE_STORE_NAME, key);
        },
    },
};
