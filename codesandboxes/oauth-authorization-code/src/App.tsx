import { useAuthenticated, FlowType } from '@ackee/petrus';
import { AuthContent, AuthRoutes } from './modules/auth';

export function App() {
    const flowType = useAuthenticated();

    switch (flowType) {
        case FlowType.ANONYMOUS:
            return <AuthRoutes />;

        case FlowType.AUTHENTICATED:
            return <AuthContent />;

        case FlowType.INDETERMINATE:
            return <div>Loading...</div>;

        default:
            return null;
    }
}
