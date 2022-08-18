import { config } from '../../../../config';
import { Navigate } from 'react-router-dom';

function createFakeRedirectUrl() {
    const searchParams = new URLSearchParams();
    searchParams.set('code', '__authorization_code__');

    return `${config.oAuth.uri.redirect}?${searchParams.toString()}`;
}

// NOTE: This component exist just for demo purposes. Otherwise this redirect would be done by some federated provider
export const Authorize = () => {
    return <Navigate to={createFakeRedirectUrl()} replace />;
};
