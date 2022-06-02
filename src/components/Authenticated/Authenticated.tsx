import { FlowType } from 'constants/index';
import type { ElementType, ReactNode } from 'react';
import { useAuthenticated } from 'hooks/useAuthenticated';

export interface AuthenticatedProps {
    children: ReactNode | ReactNode[];
    FallbackComponent?: ElementType;
    LoaderComponent?: ElementType;
}

const Empty = () => null;

/**
 *   -   `children` rendered if `flowType === FlowType.AUTHENTICATED`: valid access token and auth user are available.
 *   -   `FallbackComponent` rendered if `flowType === FlowType.ANONYMOUS`: app is unauthorized
 *   -   `Loader` renderer whenever the app can't determinate if the `flowType` is `FlowType.AUTHENTICATED` ir `FlowType.ANONYMOUS`: authorized or not.
 * @category React Component
 */
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
