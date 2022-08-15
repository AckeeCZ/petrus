import { useAuthenticated, FlowType } from '@ackee/petrus';
import { AuthContent, SignIn } from './modules/auth';

export function App() {
    const flowType = useAuthenticated();

    switch (flowType) {
        case FlowType.ANONYMOUS:
            return <SignIn />;

        case FlowType.AUTHENTICATED:
            return <AuthContent />;

        case FlowType.INDETERMINATE:
            return <div>Loading...</div>;

        default:
            return null;
    }
}
