import { isPlainObject } from 'lodash';

export default function validateTokens(tokens) {
    if (!isPlainObject(tokens)) {
        throw new TypeError(`'tokens' must be an object including 'accessToken' and 'refreshToken' properties.`);
    }

    const { accessToken } = tokens;

    if (!isPlainObject(accessToken) || !accessToken.token) {
        throw new TypeError(`'tokens.accessToken' must be an object including at least 'token' property.`);
    }
}
