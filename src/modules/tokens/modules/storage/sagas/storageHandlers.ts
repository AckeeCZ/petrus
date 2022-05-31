import { config } from 'config';
import { tokensPersistenceSelector } from 'services/selectors';

import { TOKENS_KEY } from '../config';
import type { TokensPersistence } from '../constants';
import { appSelect } from 'services/utils/reduxSaga';
import type { PetrusTokens } from 'types';

export const storageDriver = (persistence: TokensPersistence) =>
    config.mapStorageDriverToTokensPersistence[persistence];

export function* clearTokens(forcedPersistence?: TokensPersistence) {
    const persistence = yield* appSelect(tokensPersistenceSelector);

    yield storageDriver(forcedPersistence || persistence).remove(TOKENS_KEY);
}

export function* storeTokens(tokens: PetrusTokens, forcedPersistence?: TokensPersistence) {
    const persistence = yield* appSelect(tokensPersistenceSelector);

    yield storageDriver(forcedPersistence || persistence).set(TOKENS_KEY, tokens);
}

export function* retrieveTokens(forcedPersistence?: TokensPersistence): Generator<any, PetrusTokens | undefined, any> {
    const persistence = yield* appSelect(tokensPersistenceSelector);

    return yield storageDriver(forcedPersistence || persistence).get(TOKENS_KEY);
}
