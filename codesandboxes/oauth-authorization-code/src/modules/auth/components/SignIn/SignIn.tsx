import { config } from '../../../../config';

function createAuthorizationUrl() {
    const url = new URL(window.location.origin);

    url.pathname = config.oAuth.uri.authorize;

    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', config.oAuth.clientId);
    url.searchParams.set('redirect_uri', `${window.location.origin}${config.oAuth.uri.redirect}`);
    url.searchParams.set('scope', 'openid email');

    return url.toString();
}

export const SignIn = () => {
    return (
        <>
            <h1>Sign-in with federated provider:</h1>
            <button
                type="button"
                onClick={() => {
                    const authorizationUrl = createAuthorizationUrl();
                    window.location.assign(authorizationUrl);
                }}
            >
                Sign-in with some provider
            </button>
        </>
    );
};
