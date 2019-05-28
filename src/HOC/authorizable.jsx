import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';

import { authorizableSelector } from 'Services/selectors';

const MockAppLoader = () => <div>Loading...</div>;

const withAuthorizable = (AuthorizableComponent, Firewall, Loader = MockAppLoader) => {
    const AuthorizedComponent = ({ authorizable, ...props }) => {
        if (authorizable.authorizableComponent) {
            return <AuthorizableComponent {...props} />;
        }

        return authorizable.firewall ? <Firewall /> : <Loader />;
    };

    AuthorizedComponent.displayName = `Authorizable(${getDisplayName(AuthorizableComponent)})`;

    AuthorizedComponent.propTypes = {
        authorizable: PropTypes.shape({
            firewall: PropTypes.bool.isRequired,
            authorizableComponent: PropTypes.bool.isRequired,
        }).isRequired,
    };

    const mapStateToProps = state => ({
        authorizable: authorizableSelector(state),
    });

    return connect(mapStateToProps)(AuthorizedComponent);
};

export default withAuthorizable;
