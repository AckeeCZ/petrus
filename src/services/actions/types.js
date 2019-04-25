import { createAsyncType } from '@ackee/redux-utils';

const asyncType = createAsyncType({
    modulePrefix: '@@petrus',
    defaultTypes: ['REQUEST', 'SUCCESS', 'FAILURE'],
});

export default {
    ...asyncType({
        typePrefix: 'LOGIN',
    }),
    ...asyncType({
        typePrefix: 'LOGOUT',
    }),
    ...asyncType({
        typePrefix: 'REFRESH_TOKEN',
    }),
    ...asyncType({
        typePrefix: 'FETCH_USER',
    }),
    ...asyncType({
        typePrefix: 'RETRIEVE_TOKENS',
        types: ['REQUEST', 'RESOLVE'],
    }),
    ...asyncType({
        typePrefix: 'AUTH_SESSION',
        types: ['START', 'END', 'PAUSE', 'RESUME'],
    }),
    ...asyncType({
        typePrefix: 'ACCESS_TOKEN',
        types: ['AVAILABLE', 'UNAVAILABLE'],
    }),
    ...asyncType({
        types: [
            'SET_AUTH_TOKENS',
            'SET_TOKENS_PERSISTENCE',
            'SET_USER_WITH_TOKENS',
            'VERIFY_ACCESS_TOKEN_AVAILABILITY',
        ],
    }),
};
