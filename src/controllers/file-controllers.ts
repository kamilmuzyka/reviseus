/** @module Controllers/File */
import { Request, Response } from 'express';
import path from 'path';

/** Sends a single binary file that has been uploaded to the server by a user. */
export const sendSingleFile = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req.params.user;
        const fileName = req.params.filename;
        res.sendFile(
            path.join(process.env.PWD ?? '', 'uploads', userId, fileName)
        );
    } catch (err) {
        res.status(400).json({
            error: 'Could not find requested resource.',
        });
    }
};
