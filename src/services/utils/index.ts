import { ACTION_PREFIX } from 'constants/index';

export const isFn = (val: any) => typeof val === 'function';
export const isStr = (val: any) => typeof val === 'string';
export const isEmptyStr = (val: any) => isStr(val) && val.length === 0;

export { default as validateTokens } from './validateTokens';

export const actionType = <AT extends string>(type: AT) => `${ACTION_PREFIX}${type}` as const;
