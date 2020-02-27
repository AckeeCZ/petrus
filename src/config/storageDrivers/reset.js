import indexedDB from './indexedDB';

export default Object.freeze({
    set() {
        return false;
    },
    get() {
        return null;
    },
    async remove(key) {
        await indexedDB.remove(key);

        // FIXME: calling this method results in "TypeError: Illegal invocation"
        // sessionStorage.remove(key);
    },
});
