import { config } from '../../../../config';
import { Route, Routes } from 'react-router-dom';
import { SignIn } from '../SignIn';
import { RedirectHandler } from '../RedirectHandler';
import { Authorize } from '../Authorize';

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path={config.oAuth.uri.authorize} element={<Authorize />} />
            <Route path={config.oAuth.uri.redirect} element={<RedirectHandler />} />
        </Routes>
    );
};
