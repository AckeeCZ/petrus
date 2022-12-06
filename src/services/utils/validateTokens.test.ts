import { isPlainObject } from './validateTokens';

describe('isPlainObject', () => {
    it('should return true only for plain object', () => {
        expect(isPlainObject({})).toBe(true);
        expect(isPlainObject([])).toBe(false);
        expect(isPlainObject(new Map())).toBe(false);
        expect(isPlainObject(new Set())).toBe(false);
        expect(isPlainObject(null)).toBe(false);
        expect(isPlainObject(1)).toBe(false);
        expect(isPlainObject('{}')).toBe(false);
        expect(isPlainObject(undefined)).toBe(false);
        expect(isPlainObject(BigInt('1'))).toBe(false);
    });
});
