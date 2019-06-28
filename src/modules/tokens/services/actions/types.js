import { strictObjectAccess } from '@ackee/redux-utils';
import { asyncType } from 'Services/utils';

export default strictObjectAccess({
    ...asyncType({
        typePrefix: 'APPLY_ACCESS_TOKEN_',
        types: ['REQUEST', 'RESOLVE'],
    }),
    ...asyncType({
        typePrefix: 'UNAPPLY_ACCESS_TOKEN_',
        types: ['REQUEST', 'RESOLVE'],
    }),
});
