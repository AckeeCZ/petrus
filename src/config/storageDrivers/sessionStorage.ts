const noop = () => {};

const storageMock = {
    removeItem: noop,
    setItem: noop,
    getItem: noop,
} as const;

const storage = 'sessionStorage' in globalThis ? globalThis.sessionStorage : storageMock;

export default {
    set(key: string, values: any) {
        storage.setItem(key, JSON.stringify(values));
    },
    get(key: string) {
        const values = storage.getItem(key);
        return values ? JSON.parse(values) : values;
    },
    remove: storage.removeItem,
} as const;
