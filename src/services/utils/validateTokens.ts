import { PetrusError, PetrusErrorType } from 'config';

function isPlainObject<T extends Record<string, any>>(o: T) {
    return typeof o === 'object' && o.constructor === Object;
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
