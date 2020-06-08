import { PetrusError } from 'config';

function isPlainObject(o) {
    return typeof o === 'object' && o.constructor === Object;
}

export default function validateTokens(tokens) {
    if (!isPlainObject(tokens)) {
        throw new PetrusError(`'tokens' must be an object including 'accessToken' and 'refreshToken' properties.`);
    }

    const { accessToken } = tokens;

    if (!isPlainObject(accessToken) || !accessToken.token) {
        throw new PetrusError(`'tokens.accessToken' must be an object including at least 'token' property.`);
    }
}
