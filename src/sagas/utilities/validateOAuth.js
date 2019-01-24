import { isFn, isNonEmptyStr } from './is';

export default function validateOAuth(oAuth) {
    if (!oAuth.enabled) {
        return;
    }

    const {
        redirectPathname,
        validateRedirectUrl,
        parseRedirectUrl,
        fetchAccessToken,
        enforeAccessTokenScheme,
        enforeRefreshTokenScheme,
    } = oAuth;

    if (!isNonEmptyStr(redirectPathname)) {
        throw new TypeError(
            `@ackee/petrus: 'config.oAuth.redirectPathname' must be non-empty string. Received value: '${redirectPathname}'.`,
        );
    }

    Object.entries({
        validateRedirectUrl,
        parseRedirectUrl,
        fetchAccessToken,
        enforeAccessTokenScheme,
        enforeRefreshTokenScheme,
    }).forEach(([fnName, fnValue]) => {
        if (!isFn(fnValue)) {
            throw new TypeError(
                `@ackee/petrus: 'config.oAuth.${fnName}' must be a function, not a '${typeof fnValue}', received value: '${fnValue}'.`,
            );
        }
    });
}
