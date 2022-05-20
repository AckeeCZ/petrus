import React from 'react';
import { FlowType } from 'constants/index';
import type { ElementType, ReactNode } from 'react';
import { useAuthenticated } from 'hooks/useAuthenticated';

export interface AuthenticatedProps {
    children: ReactNode | ReactNode[];
    FallbackComponent?: ElementType;
    LoaderComponent?: ElementType;
}

const Empty = () => null;

export const Authenticated = ({ children, FallbackComponent = Empty, LoaderComponent = Empty }: AuthenticatedProps) => {
    const flowType = useAuthenticated();

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
