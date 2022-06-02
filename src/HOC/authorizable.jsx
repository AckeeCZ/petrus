import React from 'react';
import getDisplayName from 'react-display-name';

import Authenticated from '../components/Authenticated';

const MockAppLoader = () => <div>Loading...</div>;

/**
 * High order component that based on current state of the `auth` reducer renders one of these components:
 *
 *   -   `AuthorizableComponent` it is rendered only if an authorized user had been fetched (-> `state.auth.user`)
 *   -   `Firewall` is rendered if application isn't authorized
 *   -   `Loader` (optional) is renderer whenever the app can't determinate if it's authorized or not (e.g. when app is loading and it doesn't know yet if tokens are available or not)
 *
 * @deprecated Use `Authenticated` component instead.
 * @category HOC
 */
const withAuthorizable = (AuthorizableComponent, Firewall, Loader = MockAppLoader) => {
    const AuthorizedComponent = props => (
        <Authenticated FallbackComponent={Firewall} Loader={Loader}>
            <AuthorizableComponent {...props} />
        </Authenticated>
    );

    // eslint-disable-next-line no-console
    console.warn('authorizable HOC has been depcreated. Use Authenticated component instead.');

    AuthorizedComponent.displayName = `Authorizable(${getDisplayName(AuthorizableComponent)})`;

    return AuthorizedComponent;
};

export default withAuthorizable;
