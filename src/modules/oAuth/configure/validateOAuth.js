import { PetrusError } from 'config';
import { isFn, isEmptyStr } from 'services/utils';

export default function validateOAuth(oAuth) {
    const {
        redirectPathname,
        validateRedirectUrl,
        parseRedirectUrlParams,
        fetchAccessToken,
        enforceAccessTokenScheme,
        enforceRefreshTokenScheme,
        processTokens,
    } = oAuth;

    if (isEmptyStr(redirectPathname)) {
        throw new PetrusError(
            `'config.oAuth.redirectPathname' must be non-empty string. Received value: '${redirectPathname}'.`,
        );
    }

    Object.entries({
        validateRedirectUrl,
        parseRedirectUrlParams,
        fetchAccessToken,
        enforceAccessTokenScheme,
        enforceRefreshTokenScheme,
        processTokens,
    }).forEach(([fnName, fnValue]) => {
        if (!isFn(fnValue)) {
            throw new PetrusError(
                `'config.oAuth.${fnName}' must be a function, not a '${typeof fnValue}', received value: '${fnValue}'.`,
            );
        }
    });
}
