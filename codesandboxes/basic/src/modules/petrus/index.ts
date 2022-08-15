import { configure } from '@ackee/petrus';
import type { RootState } from '../redux/store';
import type { AuthUser, Credentials, Tokens } from 'types';

/**
 * This is optional way how to override the default inner TS interfaces of @ackee/petrus.
 */
declare module '@ackee/petrus' {
    interface ConfigurePetrusAppRootState {
        value: RootState;
    }

    interface ConfigurePetrusUser {
        value: AuthUser;
    }

    interface ConfigurePetrusCredentials {
        value: Credentials;
    }

    interface ConfigurePetrusTokens {
        value: Tokens;
    }
}

export const { saga, reducer } = configure({
    selector: state => state.petrus,

    handlers: {
        authenticate(credentials) {
            console.log(`TODO: Sign-in user with ${JSON.stringify(credentials, null, 2)}`);

            return {
                tokens: {
                    accessToken: {
                        token: '...',
                        expiration: new Date(Date.now() + 60 * 3600).toISOString(),
                    },
                    refreshToken: {
                        token: '...',
                    },
                },
            };
        },

        getAuthUser(tokens) {
            console.log('TODO: fetch auth user');

            // This method must resolve with `AuthUser` type
            return {
                name: 'John Doe',
                age: 123,
            };
        },

        refreshTokens(tokens) {
            console.log('TODO: refresh access token');

            return {
                accessToken: {
                    token: '...',
                    expiration: new Date(Date.now() + 60 * 3600).toISOString(),
                },
                refreshToken: {
                    token: '...',
                },
            };
        },
    },
});
