export interface AuthUser {
    name: string;
    age: number;
}

export type Credentials = {
    email: string;
    password: string;
};

export type Tokens = {
    accessToken: {
        token: string;
        expiration: string;
    };
    refreshToken: {
        token: string;
    };
};
