import { strictObjectAccess } from '@ackee/redux-utils';

export const tokensPersistence = strictObjectAccess({
    NONE: 'NONE',
    LOCAL: 'LOCAL',
    SESSION: 'SESSION',
});
