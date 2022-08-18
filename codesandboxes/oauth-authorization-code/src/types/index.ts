export interface AuthUser {
    name: string;
    age: number;
}

export type Credentials = {
    code: string;
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
