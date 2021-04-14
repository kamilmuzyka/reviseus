/** @module Controllers/User */
import { Request, Response } from 'express';

/** Sends data of any user based on user ID passed as a URL parameter. */
export const getUser = (req: Request, res: Response): void => {
    res.sendStatus(200);
};

/** Sends data of currently logged in user. Use on protected routes only. */
export const getCurrentUser = (req: Request, res: Response): void => {
    res.json(req.user);
};
