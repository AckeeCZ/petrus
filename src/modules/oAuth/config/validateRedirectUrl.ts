import type { PetrusConfig } from 'types';

export function validateRedirectUrl(oAuthConfig: PetrusConfig['oAuth'], location: Location) {
    return location.origin === oAuthConfig.origin && location.pathname === oAuthConfig.redirectPathname;
}
