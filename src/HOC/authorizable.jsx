import React from 'react';
import { useSelector } from 'react-redux';
import getDisplayName from 'react-display-name';

import { flowTypeSelector } from 'services/selectors';
import { FlowType } from 'constants/index';

const MockAppLoader = () => <div>Loading...</div>;

const withAuthorizable = (AuthorizableComponent, Firewall, Loader = MockAppLoader) => {
    const AuthorizedComponent = props => {
        const flowType = useSelector(flowTypeSelector);

        switch (flowType) {
            case FlowType.INDETERMINATE:
                return <Loader />;

            case FlowType.ANONYMOUS:
                return <Firewall />;

            case FlowType.AUTHENTICATED:
                return <AuthorizableComponent {...props} />;

            default:
                return null;
        }
    };

    AuthorizedComponent.displayName = `Authorizable(${getDisplayName(AuthorizableComponent)})`;

    return AuthorizedComponent;
};

export default withAuthorizable;
