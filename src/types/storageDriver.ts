import type { HandlerReturnValue } from './helpers';

export type StorageDriver = {
    set<Key extends string = string, Value extends Record<Key, any> = Record<Key, any>>(
        k: Key,
        v: Value,
    ): HandlerReturnValue<void>;

    get<Key extends string = string, Value extends Record<Key, any> = Record<Key, string>>(
        k: Key,
    ): HandlerReturnValue<Value | void>;

    remove<Key extends string = string>(k: Key): HandlerReturnValue<void>;
};
