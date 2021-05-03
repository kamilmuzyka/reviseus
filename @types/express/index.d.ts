import 'express';

interface RequestUser {
    userId: string;
    iat: number;
    exp: number;
}

declare global {
    namespace Express {
        interface Request {
            user: RequestUser;
        }
    }
}
