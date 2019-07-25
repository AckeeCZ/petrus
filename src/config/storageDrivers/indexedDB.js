import { openDB } from 'idb';

import { globalEnv } from '../global';

const noop = () => {};

const storageMock = {
    get: noop,
    put: noop,
    delete: noop,
};

const DATABASE_NAME = '@ackee/petrus';
const DATABASE_VERSION = 1;
const DATABASE_STORE_NAME = 'keyvaluepairs';

const idbConfig = {
    upgrade(nextDb) {
        nextDb.createObjectStore(DATABASE_STORE_NAME);
    },
};

const db = globalEnv.indexedDB ? openDB(DATABASE_NAME, DATABASE_VERSION, idbConfig) : storageMock;

export default Object.freeze({
    async get(key) {
        return (await db).get(DATABASE_STORE_NAME, key);
    },
    async set(key, val) {
        return (await db).put(DATABASE_STORE_NAME, val, key);
    },
    async remove(key) {
        return (await db).delete(DATABASE_STORE_NAME, key);
    },
});
