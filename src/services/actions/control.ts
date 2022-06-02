import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';

const types = {
    TERMINATE: actionType('TERMINATE'),
} as const;

/**
 * @category Redux Action Creator
 */
export const terminate = createAction<void, typeof types['TERMINATE']>(types.TERMINATE);
