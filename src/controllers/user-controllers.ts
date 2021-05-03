/** @module Controllers/User */
import { Request, Response } from 'express';
import User from '../models/user-model.js';

/** Sends data of any user based on user ID passed as a URL parameter. */
export const getUser = (req: Request, res: Response): void => {
    res.sendStatus(200);
};

/** Sends data of currently logged in user. Use on protected routes only. */
export const getCurrentUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { userId } = req.user;
    const user = await User.findOne({
        where: {
            id: userId,
        },
    });
    res.json(user);
};
