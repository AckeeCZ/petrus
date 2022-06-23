import type { ComponentType } from 'react';
import { config } from 'config';
import getDisplayName from 'react-display-name';

import { Authenticated } from '../components/Authenticated';
import type { AuthenticatedProps } from '../components/Authenticated';

/**
 * High order component that based on current state of the `auth` reducer renders one of these components:
 *
 *   -   `AuthorizableComponent` it is rendered only if an authorized user had been fetched (-> `state.auth.user`)
 *   -   `Firewall` is rendered if application isn't authorized
 *   -   `Loader` (optional) is renderer whenever the app can't determinate if it's authorized or not (e.g. when app is loading and it doesn't know yet if tokens are available or not)
 *
 * @deprecated Use `Authenticated` component instead.
 * @category HOC
 * @ignore
 * @example
 * ```js
 * import React from 'react';
 * import { authorizable } from '@ackee/petrus';
 *
 * const AuthContent = <div>User is logged in</div>;
 * const Firewall = <div>Please login</div>;
 * const Loader = <div>Loading...</div>;
 *
 * const AuthorizedComponent = authorizable(AuthContent, Firewall, Loader);
 *
 * export default AuthorizedComponent;
 * ```
 */
export const authorizable = <Props extends {}>(
    AuthorizableComponent: ComponentType<Props>,
    Firewall: AuthenticatedProps['FallbackComponent'],
    Loader: AuthenticatedProps['LoaderComponent'],
) => {
    const AuthorizedComponent = (props: Props) => (
        <Authenticated FallbackComponent={Firewall} LoaderComponent={Loader}>
            <AuthorizableComponent {...props} />
        </Authenticated>
    );

    config.logger.warn(
        'authorizable HOC has been depcreated. Use Authenticated component or useAuthenticated hook instead.',
    );

    AuthorizedComponent.displayName = `Authorizable(${getDisplayName(AuthorizableComponent)})`;

    return AuthorizedComponent;
};
