import { FlowType } from 'constants/index';

import { retrieveTokensResolve } from 'modules/tokens/modules/retrieval';
import { logout } from 'modules/auth-session';
import { createReducer } from '@reduxjs/toolkit';
import { authSessionStart } from 'services/actions';

export const createFlowTypeReducer = (initState: FlowType) =>
    createReducer(initState, b => {
        b.addCase(authSessionStart, () => FlowType.AUTHENTICATED);
        b.addCase(logout.request, () => FlowType.ANONYMOUS);
        b.addCase(retrieveTokensResolve, (state, action) => {
            const tokensRetrieved = action.payload;

            return tokensRetrieved ? state : FlowType.ANONYMOUS;
        });
    });
