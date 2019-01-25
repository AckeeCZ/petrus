import React from 'react';
import { connectWorker } from '@ackee/redux-worker/main';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';

import { AUTHORIZABLE_BRIDGE_ID } from '../constants';

const MockAppLoader = () => <div>Loading...</div>;

const authorizable = (AuthorizableComponent, Firewall, Loader = MockAppLoader) => {
    const AuthorizedComponent = props => {
        const { authUser, triedToRetrieveTokens, isLoggingIn, isUserFetching } = props;
        if (authUser) {
            return <AuthorizableComponent {...props} />;
        }

        if (!triedToRetrieveTokens || isLoggingIn || isUserFetching) {
            return <Loader />;
        }

        return <Firewall />;
    };

    AuthorizedComponent.displayName = `Authorizable(${getDisplayName(AuthorizableComponent)})`;

    AuthorizedComponent.propTypes = {
        authUser: PropTypes.shape(),
        triedToRetrieveTokens: PropTypes.bool.isRequired,
        isUserFetching: PropTypes.bool.isRequired,
        isLoggingIn: PropTypes.bool.isRequired,
    };

    AuthorizedComponent.defaultProps = {
        authUser: null,
    };

    return connectWorker(AUTHORIZABLE_BRIDGE_ID)(AuthorizedComponent);
};

export default authorizable;
