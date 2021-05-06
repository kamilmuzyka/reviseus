/** @module Controllers/Post */
import { Request, Response } from 'express';
import { validateNewPost } from '../lib/validate.js';
import Post from '../models/post-model.js';
import User from '../models/user-model.js';

export const createPost = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { userId } = req.user;
        const { title, content } = validateNewPost(req.body);
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            throw Error(
                'Could not find a user with the corresponding user ID.'
            );
        }
        const post = await Post.create({ title, content });
        await user.$set('posts', [post]);
        res.sendStatus(200);
        return;
    } catch (error) {
        res.status(400).json(error.message);
    }
};
