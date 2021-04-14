/** @module Lib/Auth */
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/** It creates a token that expires after 30 days and attaches it to the
 * request object as a cookie. */
export const createToken = (
    tokenName: string,
    userId: string,
    res: Response
): void => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET ?? '', {
        expiresIn: 2592000,
    });
    res.cookie(tokenName, token, {
        httpOnly: true,
        maxAge: 2592000000,
    });
};

/** It verifies a token and attaches its payload to the response object. */
export const verifyToken = (token: string, req: Request): void => {
    return jwt.verify(token, process.env.JWT_SECRET ?? '', (error, payload) => {
        if (error) {
            throw Error(error.message);
        }
        req.user = payload;
    });
};

/** It resets a token cookie expiry date and attaches it back to the response
 * object. */
export const removeToken = (tokenName: string, res: Response): void => {
    res.cookie(tokenName, '', { maxAge: 1 });
};

/**  It's a middleware function that protects a route from unauthorised users. It
 * checks request cookies for attached tokens and verifies them. If verification
 * happens to be successful, the token payload gets attached to the request
 * object as a property named "user". Otherwise, the middleware function
 * automatically sends a 401 code response. */
export const protect = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const googleToken = req.cookies.google;
    if (googleToken) {
        try {
            verifyToken(googleToken, req);
            next();
        } catch (err) {
            res.sendStatus(401);
        }
        return;
    }
    res.sendStatus(401);
};
