import * as Consts from '../../constants';

import { isFn } from './is';

const handlersValidators = {
    authenticate: {
        errorMessage: authenticate => `@ackee/petrus: 'authenticate' is not a function: '${authenticate}'`,
        validator: (value, { oAuthEnabled }) => (oAuthEnabled ? true : isFn(value)),
    },
    refreshTokens: {
        errorMessage: refreshTokens => `@ackee/petrus: 'refreshTokens' is not a function: ${refreshTokens}`,
        validator: isFn,
    },
    getAuthUser: {
        errorMessage: getAuthUser => {
            const { LOCAL, NONE } = Consts.tokens.persistence;

            return `@ackee/petrus: 'getAuthUser' is not a function: ${getAuthUser}. Tokens persistence is set to '${LOCAL}'. Change persistence to '${NONE}' or provide function for fetching authorized user.`;
        },

        validator: (value, { persistence }) => (persistence === Consts.tokens.persistence.LOCAL ? isFn(value) : true),
    },
};

export default function validateHandlers(handlers = {}, { persistence, oAuthEnabled }) {
    for (const [handlerKey, { errorMessage, validator }] of Object.entries(handlersValidators)) {
        const handler = handlers[handlerKey];

        if (!validator(handler, { persistence, oAuthEnabled })) {
            throw new TypeError(errorMessage(handler));
        }
    }
}
