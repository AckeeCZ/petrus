import { openDB } from 'idb';

const DATABASE_NAME = '@ackee/petrus';
const DATABASE_VERSION = 1;
const DATABASE_STORE_NAME = 'keyvaluepairs';

const db = openDB(DATABASE_NAME, DATABASE_VERSION, {
    upgrade(nextDb) {
        nextDb.createObjectStore(DATABASE_STORE_NAME);
    },
});

export async function get(key) {
    return (await db).get(DATABASE_STORE_NAME, key);
}

export async function set(key, val) {
    return (await db).put(DATABASE_STORE_NAME, val, key);
}

export async function remove(key) {
    return (await db).delete(DATABASE_STORE_NAME, key);
}
