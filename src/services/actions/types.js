import { createAsyncType, strictObjectAccess } from '@ackee/redux-utils';

const asyncType = createAsyncType({
    modulePrefix: '@@petrus',
});

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
});
