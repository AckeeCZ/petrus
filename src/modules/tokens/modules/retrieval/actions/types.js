import { strictObjectAccess } from '@ackee/redux-utils';
import { asyncType } from 'services/utils';

export default strictObjectAccess(
    asyncType({
        typePrefix: 'RETRIEVE_TOKENS_',
        types: ['REQUEST', 'RESOLVE'],
    }),
);
