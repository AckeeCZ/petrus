import validateRedirectUrl from './validateRedirectUrl';
import getSearchParams from './getSearchParams';
import enforceAccessTokenScheme from './enforceAccessTokenScheme';
import enforceRefreshTokenScheme from './enforceRefreshTokenScheme';

export default {
    origin: '',
    redirectPathname: '/oauth/redirect',
    validateRedirectUrl,
    parseRedirectUrlParams: getSearchParams,
    fetchAccessToken() {},
    enforceAccessTokenScheme,
    enforceRefreshTokenScheme,
};
