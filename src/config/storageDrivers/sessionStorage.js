import { globalEnv } from '../global';

const noop = () => {};

const storageMock = {
    removeItem: noop,
    setItem: noop,
    getItem: noop,
};

const storage = globalEnv.sessionStorage || storageMock;

export default Object.freeze({
    set(key, values) {
        storage.setItem(key, JSON.stringify(values));
    },
    get(key) {
        const values = storage.getItem(key);
        return values ? JSON.parse(values) : values;
    },
    remove: storage.removeItem,
});
