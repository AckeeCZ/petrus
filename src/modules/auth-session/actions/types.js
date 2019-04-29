import { strictObjectAccess } from '@ackee/redux-utils';
import { asyncType } from 'Services/utils';

export default strictObjectAccess({
    ...asyncType({
        typePrefix: 'LOGIN_',
    }),
    ...asyncType({
        typePrefix: 'LOGOUT_',
    }),
    ...asyncType({
        typePrefix: 'FETCH_USER_',
    }),
    ...asyncType({
        types: ['SET_USER_WITH_TOKENS'],
    }),
});
