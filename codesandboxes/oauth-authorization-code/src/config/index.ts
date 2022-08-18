export const config = {
    oAuth: {
        uri: {
            authorize: `/oauth/authorize`,
            redirect: `/oauth/redirect`,
        },
        clientId: '__clientId__',
    },
} as const;
