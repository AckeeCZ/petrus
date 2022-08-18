import { logoutRequest, entitiesSelector } from '@ackee/petrus';
import { useAppSelector } from '../../../../modules/redux';
import { useDispatch } from 'react-redux';

export const AuthContent = () => {
    const dispatch = useDispatch();
    const authUser = useAppSelector(state => entitiesSelector(state).user);

    if (!authUser) {
        return null;
    }

    return (
        <div>
            <h1>Authenticated user: {authUser.name}</h1>
            <button
                type="button"
                onClick={() => {
                    dispatch(logoutRequest());
                }}
            >
                Logout
            </button>
        </div>
    );
};
