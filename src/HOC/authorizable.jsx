import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDisplayName } from '../utilities';
import * as selectors from '../selectors';

const MockAppLoader = () => <div>Loading...</div>;

const authorizable = (AuthorizableComponent, Firewall, Loader = MockAppLoader) => {
    const AuthorizedComponent = ({ isLoggedIn, isLoggingIn, triedToRetrieveTokens, ...props }) => {
        if (isLoggedIn) {
            return <AuthorizableComponent {...props} />;
        } else if (!triedToRetrieveTokens || isLoggingIn) {
            return <Loader />;
        }

        return <Firewall />;
    };

    AuthorizedComponent.displayName = `Authorizable(${getDisplayName(AuthorizableComponent)})`;

    AuthorizedComponent.propTypes = {
        isLoggedIn: PropTypes.bool.isRequired,
        triedToRetrieveTokens: PropTypes.bool.isRequired,
    };

    const mapStateToProps = state => ({
        isLoggedIn: selectors.isLoggedIn(state),
        triedToRetrieveTokens: selectors.triedToRetrieveTokens(state),
        isLoggingIn: selectors.isLoggingIn(state),
    });

    return connect(mapStateToProps)(AuthorizedComponent);
};

export default authorizable;
