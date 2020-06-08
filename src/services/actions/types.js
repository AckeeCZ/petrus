import { strictObjectAccess } from '@ackee/redux-utils';
import { asyncType } from 'services/utils';

export default strictObjectAccess({
    ...asyncType({
        types: ['SET_TOKENS', 'DELETE_TOKENS'],
    }),
    ...asyncType({
        typePrefix: 'AUTH_SESSION_',
        types: ['START', 'END', 'PAUSE', 'RESUME'],
    }),
    ...asyncType({
        typePrefix: 'ACCESS_TOKEN_',
        types: ['AVAILABLE', 'UNAVAILABLE'],
    }),
    ...asyncType({
        types: ['TERMINATE'],
    }),
});
