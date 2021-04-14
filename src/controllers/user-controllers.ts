/** @module Controllers/User */
import { Request, Response } from 'express';

/** It sends any user data based on user ID passed as a URL parameter. */
export const getUser = (req: Request, res: Response): void => {
    res.sendStatus(200);
};

/** It sends currently logged in user data. Use on protected routes only. */
export const getCurrentUser = (req: Request, res: Response): void => {
    res.json(req.user);
};
