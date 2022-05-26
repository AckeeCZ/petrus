import type { PetrusHandlerReturnValue } from 'types';

export type StorageDriver = {
    set<Key extends string = string, Value extends Record<Key, any> = Record<Key, any>>(
        k: Key,
        v: Value,
    ): PetrusHandlerReturnValue<void>;

    get<Key extends string = string, Value extends Record<Key, any> = Record<Key, string>>(
        k: Key,
    ): PetrusHandlerReturnValue<Value | void>;

    remove<Key extends string = string>(k: Key): PetrusHandlerReturnValue<void>;
};
