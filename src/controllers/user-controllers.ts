/** @module Controllers/User */
import { Request, Response } from 'express';

/** It sends currently logged in user data. */
export const getUser = (req: Request, res: Response): void => {
    res.sendStatus(200);
};

/** It sends any user data based on user ID passed as a URL parameter. */
export const getCurrentUser = (req: Request, res: Response): void => {
    res.json(req.user);
};
