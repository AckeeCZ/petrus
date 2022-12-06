import { PetrusError, PetrusErrorType } from 'config';

export function isPlainObject(o: any): o is Record<string, any> {
    if (typeof o !== 'object' || !o || o[Symbol.toStringTag] !== undefined) {
        return false;
    }

    const stringfied = JSON.stringify(o);

    return stringfied[0] === '{' && stringfied[stringfied.length - 1] === '}';
}

export default function validateTokens<T extends Record<string, any>>(tokens?: T): void | never {
    if (!tokens || !isPlainObject(tokens)) {
        throw new PetrusError(
            PetrusErrorType.INVALID_TOKENS,
            `'tokens' must be an object including 'accessToken' property.`,
        );
    }

    const { accessToken } = tokens;

    if (!isPlainObject(accessToken) || !accessToken.token) {
        throw new PetrusError(
            PetrusErrorType.INVALID_TOKENS,
            `'tokens.accessToken' must be an object including at least 'token' property.`,
        );
    }
}

export function areTokensValid<T extends Record<string, any>>(tokens?: T): boolean {
    try {
        validateTokens(tokens);
        return true;
    } catch (e) {
        return false;
    }
}
