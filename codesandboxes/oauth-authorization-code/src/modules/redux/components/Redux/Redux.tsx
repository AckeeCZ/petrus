import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '../../store';

interface ReduxProps {
    children: ReactNode;
}

export function Redux({ children }: ReduxProps) {
    return <Provider store={store}>{children}</Provider>;
}
