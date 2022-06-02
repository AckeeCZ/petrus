import { validateRedirectUrl } from './validateRedirectUrl';
import { getSearchParams } from './getSearchParams';
import { enforceAccessTokenScheme } from './enforceAccessTokenScheme';
import { enforceRefreshTokenScheme } from './enforceRefreshTokenScheme';
import { processTokens } from './processTokens';
import type { PetrusConfig } from 'types';

export const defaultOAuthConfig: PetrusConfig['oAuth'] = {
    enabled: false,
    origin: '',
    redirectPathname: '/oauth/redirect',
    validateRedirectUrl,
    parseRedirectUrlParams: getSearchParams,
    fetchAccessToken() {},
    enforceAccessTokenScheme,
    enforceRefreshTokenScheme,
    processTokens,
} as const;
