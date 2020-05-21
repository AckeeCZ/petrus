import { openDB as openDBReal } from 'idb';

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

async function openDB() {
    try {
        const open = globalEnv.indexedDB ? openDBReal(DATABASE_NAME, DATABASE_VERSION, idbConfig) : storageMock;
        const db = await open(DATABASE_NAME, DATABASE_VERSION, idbConfig);

        return db;
    } catch (e) {
        return storageMock;
    }
}

const db = openDB();

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
