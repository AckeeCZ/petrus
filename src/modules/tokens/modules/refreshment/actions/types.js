import { strictObjectAccess } from '@ackee/redux-utils';
import { asyncType } from 'services/utils';

export default strictObjectAccess({
    ...asyncType({
        typePrefix: 'REFRESH_TOKENS_',
    }),
    ...asyncType({
        types: ['CHECK_ACCESS_TOKEN_EXPIRATION'],
    }),
});
