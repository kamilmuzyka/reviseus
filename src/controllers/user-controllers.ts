/** @module Controllers/User */
import { Request, Response } from 'express';
import User from '../models/user-model.js';
import testUUID from '../utils/test-uuid.js';

/** Sends data of any user based on user ID passed as a URL parameter. */
export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.id;
        if (userId && testUUID(userId)) {
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                throw Error(
                    'Could not find a user with the corresponding user ID.'
                );
            }
            res.json(user);
            return;
        }
        throw Error('Incorrect user ID.');
    } catch (error) {
        res.status(400).json(error.message);
    }
};

/** Sends data of currently logged in user. Use on protected routes only. */
export const getCurrentUser = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { userId } = req.user;
        if (userId && testUUID(userId)) {
            const user = await User.findOne({ where: { id: userId } });
            if (!user) {
                throw Error(
                    'Could not find a user with the corresponding user ID.'
                );
            }
            res.json(user);
            return;
        }
        throw Error('Invalid user ID.');
    } catch (error) {
        res.status(400).json(error.message);
    }
};
