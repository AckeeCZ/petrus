import { createApiRequestType } from '@ackee/redux-utils';

export const asyncType = createApiRequestType({
    modulePrefix: '@@petrus',
    defaultTypes: ['REQUEST', 'SUCCESS', 'FAILURE'],
});

export const isFn = val => typeof val === 'function';
export const isStr = val => typeof val === 'string';
export const isEmptyStr = val => isStr(val) && val.length === 0;

export { default as validateTokens } from './validateTokens';
