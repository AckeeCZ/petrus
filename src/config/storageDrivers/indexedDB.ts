import { config } from 'config';
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

async function accessDB(operation: 'get' | 'put' | 'delete', key: string, value?: any) {
    try {
        if (operation === 'put') {
            return (await db)[operation](DATABASE_STORE_NAME, value, key);
        }
        return (await db)[operation](DATABASE_STORE_NAME, key);
    } catch (e) {
        const ignoresError = 'A mutation operation was attempted on a database that did not allow mutations.';

        if ((e as Error).message !== ignoresError) {
            config.logger.error(e);
        }

        return null;
    }
}

export const indexedDB = {
    async get<Key extends string>(key: Key) {
        return accessDB('get', key);
    },
    async set<Key extends string, Value extends any>(key: Key, val: Value) {
        await accessDB('put', key, val);
    },
    async remove<Key extends string>(key: Key) {
        await accessDB('delete', key);
    },
} as const;

export type IndexedDBStorage = typeof indexedDB;
