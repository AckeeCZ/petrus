export default function validateRedirectUrl(oAuthConfig, location) {
    return location.origin === oAuthConfig.origin && location.pathname === oAuthConfig.redirectPathname;
}
