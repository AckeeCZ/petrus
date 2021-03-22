import React from 'react';
import getDisplayName from 'react-display-name';

import Authenticated from '../components/Authenticated';

const MockAppLoader = () => <div>Loading...</div>;

/**
 * Use `Authenticated` component instead.
 * @deprecated
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
