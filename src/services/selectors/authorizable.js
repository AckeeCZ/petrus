import { createSelector } from 'reselect';

import { authSession, apiKeys } from 'Consts';

import { entitiesSelector } from './entities';
import { apiSelectorFactory } from './api';

const retrieveTokens = apiSelectorFactory(apiKeys.RETRIEVE_TOKENS);

const { ACTIVE, PAUSED } = authSession;

const tokensAreEmpty = tokens => !tokens || !tokens.accessToken;

export const authorizableSelector = createSelector(
    [entitiesSelector, retrieveTokens],
    ({ sessionState, tokens }, retrieveTokensApi) => {
        return {
            authorizableComponent: sessionState === ACTIVE || sessionState === PAUSED,
            firewall: retrieveTokensApi.success && tokensAreEmpty(tokens),
        };
    },
);
