# Custom Storage Drive

Each tokens persistence (e.g. `TokensPersistence.LOCAL`) has its own a storage driver that you may override by your own. See the default config below.

## Default configuration

```js
import { configure, TokensPersistence, StorageDrivers } from '@ackee/petrus';

const { LOCAL, SESSION } = TokensPersistence;

const { saga, reducer } = configure({
    // (rest of required Petrus configuration)

    // Defaults:
    mapStorageDriverToTokensPersistence: {
        [LOCAL]: StorageDrivers.indexedDB,
        [SESSION]: StorageDrivers.sessionStorage,
    },
});
```

---

## Example

### 1. Create custom storage driver

First, let's create custom storage driver for `localStorage` and use it instead `indexedDB` for `TokensPersistence.LOCAL`.

The storage driver object must contain `get`, `set` and `remove` methods (they'll be resolved as asynchronous methods).

> ### Handlers might be **async or generator functions**
>
> `get`, `set` and `remove` methods are part of `redux-saga` context, therefore they might be generator functions as well.

```js
const localStorageDriver = {
    async set(key, values) {
        localStorage.setItem(key, JSON.stringify(values));
    },
    // Must return those `values` set by the 'set' method.
    async get(key) {
        const stringifiedValues = localStorage.getItem(key);

        return stringifiedValues ? JSON.parse(stringifiedValues) : stringifiedValues;
    },
    async remove(key) {
        localStorager.removeItem(key);
    },
};
```

### 2. Pass the custom driver to config

```js
import { configure, TokensPersistence } from '@ackee/petrus';

const { LOCAL, SESSION } = TokensPersistence;

const { saga, reducer } = configure({
    // (rest of required Petrus configuration)

    mapStorageDriverToTokensPersistence: {
        // Here we override the default storage driver
        [LOCAL]: localStorageDriver,
    },
});
```

Now the `localStorageDriver` will be used for `LOCAL` tokens peristence instead of the default one.

---

Back to [Usage Examples](index.md).
