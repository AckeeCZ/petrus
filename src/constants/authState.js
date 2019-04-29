import { strictObjectAccess } from '@ackee/redux-utils';

export const authSession = strictObjectAccess({
    ACTIVE: 'ACTIVE',
    PAUSED: 'PAUSED',
    INACTIVE: 'INACTIVE',
});
