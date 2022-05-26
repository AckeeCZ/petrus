import { openDB as openDBReal } from 'idb';

const noop = () => {};

const storageMock = {
    get: noop,
    put: noop,
    delete: noop,
} as const;

const DATABASE_NAME = '@ackee/petrus';
const DATABASE_VERSION = 1;
const DATABASE_STORE_NAME = 'keyvaluepairs';

async function openDB() {
    try {
        const open = ('indexedDB' in globalThis ? openDBReal : storageMock) as unknown as typeof openDBReal;
        return open(DATABASE_NAME, DATABASE_VERSION, {
            upgrade(nextDb) {
                nextDb.createObjectStore(DATABASE_STORE_NAME);
            },
        });
    } catch (e) {
        return storageMock;
    }
}

const db = openDB();

export const indexedDB = {
    async get<Key extends string>(key: Key) {
        return (await db).get(DATABASE_STORE_NAME, key);
    },
    async set<Key extends string, Value extends any>(key: Key, val: Value) {
        return (await db).put(DATABASE_STORE_NAME, val, key);
    },
    async remove<Key extends string>(key: Key) {
        return (await db).delete(DATABASE_STORE_NAME, key);
    },
} as const;

export type IndexedDBStorage = typeof indexedDB;
