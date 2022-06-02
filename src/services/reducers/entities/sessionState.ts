import { AuthSession } from 'constants/index';
import { createReducer } from '@reduxjs/toolkit';

import { authSessionResume, authSessionStart, authSessionPause, authSessionEnd } from '../../actions';

export const createSessionStateReducer = (initState: AuthSession | null) =>
    createReducer(initState, b => {
        b.addCase(authSessionStart, () => AuthSession.ACTIVE);
        b.addCase(authSessionPause, () => AuthSession.PAUSED);
        b.addCase(authSessionResume, () => AuthSession.ACTIVE);
        b.addCase(authSessionEnd, () => AuthSession.INACTIVE);
    });
