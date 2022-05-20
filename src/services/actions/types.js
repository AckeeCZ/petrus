import { asyncType } from 'services/utils';

export default {
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
};
