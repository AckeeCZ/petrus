export const isFn = val => typeof val === 'function';
export const isStr = val => typeof val === 'string';
export const isNonEmptyStr = val => isStr(val) && val.length > 0;
