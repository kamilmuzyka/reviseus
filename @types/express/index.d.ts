import 'express';

interface RequestUser {
    userId: string;
    iat: number;
    exp: number;
}

declare module 'express' {
    interface Request {
        user: RequestUser;
    }
}
