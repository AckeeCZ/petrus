const noop = () => {};

const storageMock = {
    removeItem: noop,
    setItem: noop,
    getItem: noop,
} as const;

const storage = 'sessionStorage' in globalThis ? globalThis.sessionStorage : (storageMock as unknown as Storage);

export const sessionStorage = {
    set<Key extends string, Value extends any>(key: Key, values: Value) {
        storage.setItem(key, JSON.stringify(values));
    },
    get<Key extends string>(key: Key) {
        const values = storage.getItem(key);
        return values ? JSON.parse(values) : values;
    },
    remove<Key extends string>(key: Key) {
        storage.removeItem(key);
    },
} as const;

export type SessionStorage = typeof sessionStorage;
