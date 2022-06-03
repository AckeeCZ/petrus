import { createAction } from '@reduxjs/toolkit';
import { actionType } from 'services/utils';

const types = {
    TERMINATE: actionType('TERMINATE'),
} as const;

/**
 * Calls cancel redux saga effect on root Petrus saga and therefore end all infinite loops within.
 * This cancel the saga returned from the `configure` method.
 *
 * @category Redux Action Creator
 */
export const terminate = createAction<void, typeof types['TERMINATE']>(types.TERMINATE);
