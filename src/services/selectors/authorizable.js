import { createSelector } from 'reselect';
import { isEmpty } from 'lodash';

import { authSession, apiKeys } from 'Consts';

import { entitiesSelector } from './entities';
import { apiSelectorFactory } from './api';

const retrieveTokens = apiSelectorFactory(apiKeys.RETRIEVE_TOKENS);

const { ACTIVE, PAUSED } = authSession;

export const authorizableSelector = createSelector(
    [entitiesSelector, retrieveTokens],
    ({ sessionState, tokens }, retrieveTokensApi) => {
        return {
            authorizableComponent: sessionState === ACTIVE || sessionState === PAUSED,
            firewall: retrieveTokensApi.success && isEmpty(tokens),
        };
    },
);
