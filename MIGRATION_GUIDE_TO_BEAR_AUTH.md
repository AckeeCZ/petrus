# How to migrate from `@ackee/petrus` to [the Bear Auth](https://github.com/AckeeCZ/bear-auth)

Bear auth is writtin in vanilla TypeScript with no dependency (expect `loglevel`).
The core is promise-based, framework agnostic, can be easily customized.
Of course, the actual migration guide depends on specific parameters of your technical stack. I am going to guide you with two types of migrations.

1. `@ackee/petrus` to `@bear-auth/core` (no framework)
2. `@ackee/petrus` to `@bear-auth/core` with `@bear-auth/react`

There're also fully working bear auth examples:

1. [Bear Auth - Core example](https://github.com/AckeeCZ/bear-auth/tree/main/examples/core)
2. [Bear Auth - React example](https://github.com/AckeeCZ/bear-auth/tree/main/examples/react)

---

## Migration from `@ackee/petrus` to `@bear-auth/core` (no framework)

The Bear Auth API has been designed as pure function into which you pass reference of given instance. For example, to set _hooks_ (previously called _handlers_):

**With Petrus**

```ts
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
```

**With Bear Auth**

```ts
import { create, setRefreshTokenHook, setFetchAuthInfoHook, setLogoutHook } from '@bear-auth/core';

// 1. Call this only once. The `create` method returns a string ID of Bear Auth instance which you will refer to with each method.
export const bearAuth = create();

export type AuthInfo = {
    name: string;
    age: number;
};

// 2. Set hook for refreshing access token
const refreshToken = setRefreshTokenHook<AuthInfo>(bearAuth, async session => {
    console.log('TODO: refresh access token');

    return {
        accessToken: '...',
        expiration: new Date(Date.now() + 60 * 3600).toISOString(),
        refreshToken: '...',
        // Optionally:
        // authInfo: { name: 'John Doe', age: 123 }
    };
});

// 3. Set hook for fetching authentication info (e.g. auth user)
const refetchAuthInfo = setFetchAuthInfoHook<AuthInfo>(bearAuth, async session => {
    console.log('TODO: fetch auth user');

    // This method must resolve with `AuthUser` type
    return {
        name: 'John Doe',
        age: 123,
    };
});

// 4. Set hook to handler logout
const logout = setLogoutHook<AuthInfo>(bearAuth, async session => {
    // call your API and sign-out the user
});
```

Note that each hook returns async function – _a trigger_ – which you can use to trigger the hook manually.

Since there's no saga, you have to start the authentication flow by your self:

```ts
import { authenticate } from '@bear-auth/core';

// 5. Use `authenticate` async method within your registration / login flow to
async function loginUser(email: string, password: string) {
    // TODO: call your API and receive access and refresh token token

    await authenticate<AuthInfo>({
        accessToken: '...',
        refreshToken: '...',
        expiration: '...', // a timestamp in ISO format
        // Optionally:
        // authInfo: {
        //     name: 'John Doe',
        //     age: 123,
        // },
    });
}
```

```ts
import { retrieveAuthSession } from '@bear-auth/core';

// 6. Call this on page load once bear auth has been set up.
// It retrieves the authentication session from persisted storage, refreshes access token and auth info, if needed and resolves to either `authenticated` or `unauthenticated` state.
await retrieveAuthSession();
```

But we haven't set any persistent storage yet. Let's fix it:

```ts
import { setStorage } from '@bear-auth/core';

// Call this starting the auth. flow (e.g. before calling `retrieveAuthSession` or `authenticate` methods)
setStorage<AuthInfo>(bearAuth, {
    // The schema looks like this:
    version: 1,
    async set(key, data) {},
    async get(key) {},
    async remove(key) {},
    async clear() {},
});
```

You can use any storage you like. I recommend using some asynchronous storage (so the main thread isn't blocked when accessing the storage).
To simplify it as much as possible, you use `@bear-auth/storage` which offers port to IndexedDB with schema defined with Zod.

```ts
import { createIndexedDBStorage } from '@bear-auth/storage';
import z from 'zod';

const storage = createIndexedDBStorage({
    bearAuthId,
    // Optionally, define `authInfo` with Zod:
    authInfo: z.object({
        name: z.string(),
        age: z.number(),
    }),
});

// And just pass it to the method:
setStorage<AuthInfo>(bearAuth, storage);
```

[Check out all complete available API of the `@bear-auth/core`](https://github.com/AckeeCZ/bear-auth/blob/main/packages/core/docs/API.md).

## Migration from `@ackee/petrus` to Bear Auth with React

Same as in the migration above, you call `create` method to get a new Bear auth instance. Then you set all hooks you need, storage, log level, etc.
Once you have done it all of it. You can proceed to the React setup:

```tsx
import { BearAuthProvider } from '@bear-auth/react';
import { AuthBearSection } from './AuthBearSection';

// 1. Add `BearAuthProvider` to the root of your project and pass triggers from those hooks
//   E.g. `setRefreshTokenHook` returns `refreshToken` trigger, etc.
function App() {
    return (
        <BearAuthProvider<AuthInfo> id={bearAuthId} actions={{ refetchAuthInfo, refreshToken, logout }}>
            <AuthBearSection />
        </BearAuthProvider>
    );
}
```

Then you can access the context within the provider as:

```tsx
import { useBearAuthSession } from '@bear-auth/react';
import { useBearAuth } from '@bear-auth/core';

export const AuthBearSection = () => {
    const session = useBearAuthSession<AuthInfo>();
    const { id, actions } = useBearAuth<AuthInfo>();

    console.log(session.state, session.data);

    // actions.refetchAuthInfo, actions.logout, actions.refreshToken

    return (
        <div>
            <p>{session.status}</p>

            <button
                type="button"
                onClick={async () => {
                    // TODO: login on your API
                    // Pass received tokens to the Bear auth
                    await authenticate<AuthInfo>({
                        accessToken: '...',
                        refreshToken: '...',
                        expiration: '...',
                        // Optionally:
                        // authInfo: { ... },
                    });
                }}
            >
                Sign-in / Sign-up
            </button>

            <button
                type="button"
                onClick={async () => {
                    actions.logout();
                }}
            >
                Sign-out
            </button>
        </div>
    );
};
```

Note you don't have to call the `retrieveAuthSession`. That's handled by the `BearAuthProvider` together with updatting the session.
