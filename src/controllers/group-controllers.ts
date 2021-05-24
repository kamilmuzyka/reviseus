/** @module Controllers/Group */
import { Request, Response } from 'express';
import testUUID from '../utils/test-uuid.js';
import Post from '../models/post-model.js';

/** Sends all posts belonging to a group given by ID passed as a URL parameter.
 * If there is no ID provided, it sends public posts that don't belong to any
 * group. */
export const sendGroupPosts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const groupId = req.params.id;

        /** Find and send group posts if a group ID has been provided. */
        if (groupId && testUUID(groupId)) {
            const groupPosts = await Post.findAll({
                where: {
                    groupId,
                },
            });
            res.json(groupPosts);
            return;
        }

        /** Find and send public posts if no group ID has been provided. */
        const publicPosts = await Post.findAll({
            where: {
                groupId: null,
            },
        });
        res.json(publicPosts);
        return;
    } catch (error) {
        res.status(400).json(error.message);
    }
};
