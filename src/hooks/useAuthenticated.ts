import type { FlowType } from 'constants/index';
import { useSelector } from 'react-redux';
import { flowTypeSelector } from 'services/selectors';

export function useAuthenticated(): FlowType {
    return useSelector(flowTypeSelector);
}
