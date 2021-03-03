import React from 'react';
import getDisplayName from 'react-display-name';

import Authenticated from '../components/Authenticated';

const MockAppLoader = () => <div>Loading...</div>;

const withAuthorizable = (AuthorizableComponent, Firewall, Loader = MockAppLoader) => {
    const AuthorizedComponent = props => (
        <Authenticated FallbackComponent={Firewall} Loader={Loader}>
            <AuthorizableComponent {...props} />
        </Authenticated>
    );

    // eslint-disable-next-line no-console
    console.warning('authorizable HOC will be deprecated soon. We suggest using Authenticated component instead.');

    AuthorizedComponent.displayName = `Authorizable(${getDisplayName(AuthorizableComponent)})`;

    return AuthorizedComponent;
};

export default withAuthorizable;
