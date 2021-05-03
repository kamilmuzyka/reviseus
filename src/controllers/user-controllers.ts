/** @module Controllers/User */
import { Request, Response } from 'express';
import User from '../models/user-model.js';
import testUUID from '../utils/test-uuid.js';

/** Sends data of any user based on user ID passed as a URL parameter. */
export const getUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    if (userId && testUUID(userId)) {
        const user = await User.findOne({ where: { id: userId } });
        if (user) {
            res.json(user);
            return;
        }
        res.sendStatus(404);
        return;
    }
    res.sendStatus(400);
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
