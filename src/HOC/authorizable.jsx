import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getDisplayName } from '../utilities';
import * as selectors from '../selectors';

const MockAppLoader = () => <div>Loading...</div>;

const authorizable = (AuthorizableComponent, Firewall, Loader = MockAppLoader) => {
    const AuthorizedComponent = props => {
        if (props.authUser) {
            return <AuthorizableComponent {...props} />;
        } else if (!props.triedToRetrieveTokens || props.isLoggingIn) {
            return <Loader />;
        }

        return <Firewall />;
    };

    AuthorizedComponent.displayName = `Authorizable(${getDisplayName(AuthorizableComponent)})`;

    AuthorizedComponent.propTypes = {
        authUser: PropTypes.shape(),
        triedToRetrieveTokens: PropTypes.bool.isRequired,
    };

    AuthorizedComponent.defaultProps = {
        authUser: null,
    };

    const mapStateToProps = state => ({
        authUser: selectors.authUser(state),
        triedToRetrieveTokens: selectors.triedToRetrieveTokens(state),
        isLoggingIn: selectors.isLoggingIn(state),
    });

    return connect(mapStateToProps)(AuthorizedComponent);
};

export default authorizable;
