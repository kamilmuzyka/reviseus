import 'express';

interface CurrentUser {
    userId: string;
    iat: number;
    exp: number;
}

interface File {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}

declare global {
    namespace Express {
        interface Request {
            user: CurrentUser;
            files: File[];
        }
    }
}
