import type { FlowType } from 'constants/index';
import { useSelector } from 'react-redux';
import { entitiesSelector } from 'services/selectors';

export function useAuthenticated(): FlowType {
    const { flowType } = useSelector(entitiesSelector);
    return flowType;
}
