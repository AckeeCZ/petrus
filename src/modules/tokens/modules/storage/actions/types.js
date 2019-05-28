import { strictObjectAccess } from '@ackee/redux-utils';
import { asyncType } from 'Services/utils';

export default strictObjectAccess(
    asyncType({
        types: ['SET_TOKENS_PERSISTENCE'],
    }),
);
