import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { FlowType } from '../constants';
import { flowTypeSelector } from '../services/selectors';

const Authenticated = ({ children, FallbackComponent, LoaderComponent }) => {
    const flowType = useSelector(flowTypeSelector);

    switch (flowType) {
        case FlowType.INDETERMINATE:
            return <LoaderComponent />;

        case FlowType.ANONYMOUS:
            return <FallbackComponent />;

        case FlowType.AUTHENTICATED:
            return <>{children}</>;

        default:
            return null;
    }
};

Authenticated.propTypes = {
    children: PropTypes.node.isRequired,
    FallbackComponent: PropTypes.func.isRequired,
    LoaderComponent: PropTypes.func,
};

Authenticated.defaultProps = {
    LoaderComponent: () => null,
};

export default Authenticated;
