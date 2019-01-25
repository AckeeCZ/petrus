import { uniqueId } from '@ackee/redux-worker/es';

export const tokens = {
    persistence: {
        NONE: 'NONE',
        LOCAL: 'LOCAL',
        SESSION: 'SESSION',
    },
};

export const AUTHORIZABLE_BRIDGE_ID = uniqueId('AUTHORIZANLE_BRIDGE');
