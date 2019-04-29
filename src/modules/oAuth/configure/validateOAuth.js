import { PetrusError } from 'Config';
import { isFn, isEmptyStr } from 'Services/utils';

export default function validateOAuth(oAuth) {
    const {
        redirectPathname,
        validateRedirectUrl,
        parseRedirectUrlParams,
        fetchAccessToken,
        enforceAccessTokenScheme,
        enforceRefreshTokenScheme,
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
    }).forEach(([fnName, fnValue]) => {
        if (!isFn(fnValue)) {
            throw new PetrusError(
                `'config.oAuth.${fnName}' must be a function, not a '${typeof fnValue}', received value: '${fnValue}'.`,
            );
        }
    });
}
