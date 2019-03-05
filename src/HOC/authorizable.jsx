import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';

import * as selectors from '../selectors';

const MockAppLoader = () => <div>Loading...</div>;

const authorizable = (AuthorizableComponent, Firewall, Loader = MockAppLoader) => {
    const AuthorizedComponent = props => {
        const { authUser, accessTokenIsAvailable, triedToRetrieveTokens, isLoggingIn, isUserFetching } = props;
        if (authUser && accessTokenIsAvailable) {
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
        accessTokenIsAvailable: PropTypes.bool.isRequired,
    };

    AuthorizedComponent.defaultProps = {
        authUser: null,
    };

    const mapStateToProps = state => ({
        authUser: selectors.authUser(state),
        triedToRetrieveTokens: selectors.triedToRetrieveTokens(state),
        isLoggingIn: selectors.isLoggingIn(state),
        isUserFetching: selectors.isUserFetching(state),
        accessTokenIsAvailable: selectors.accessTokenIsAvailable(state),
    });

    return connect(mapStateToProps)(AuthorizedComponent);
};

export default authorizable;
