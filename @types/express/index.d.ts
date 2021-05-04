import 'express';

interface CurrentUser {
    userId: string;
    iat: number;
    exp: number;
}

declare global {
    namespace Express {
        interface Request {
            user: CurrentUser;
        }
    }
}
