import { loginRequest } from '@ackee/petrus';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const RedirectHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code');

        if (code) {
            dispatch(loginRequest({ code }));

            // redirect from redirect url to home page
            navigate('/');
        }
    }, [dispatch, navigate]);

    return <div>Using code to get an access token...</div>;
};
