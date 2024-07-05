interface Authentication {
    password: string;
    salt: string;
    sessionToken: string | null;
}

export interface User {
    authentication: Authentication;
    _id: string;
    username: string;
    email: string;
    __v: number;
}

export interface ApiResponse {
    user: User;
}
