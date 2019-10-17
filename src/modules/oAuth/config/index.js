import validateRedirectUrl from './validateRedirectUrl';
import getSearchParams from './getSearchParams';
import enforceAccessTokenScheme from './enforceAccessTokenScheme';
import enforceRefreshTokenScheme from './enforceRefreshTokenScheme';
import processTokens from './processTokens';

export default {
    origin: '',
    redirectPathname: '/oauth/redirect',
    validateRedirectUrl,
    parseRedirectUrlParams: getSearchParams,
    fetchAccessToken() {},
    enforceAccessTokenScheme,
    enforceRefreshTokenScheme,
    processTokens,
};
