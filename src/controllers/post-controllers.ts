/** @module Controllers/Post */
import { Request, Response } from 'express';

export const createPost = async (
    req: Request,
    res: Response
): Promise<void> => {
    res.sendStatus(200);
};
