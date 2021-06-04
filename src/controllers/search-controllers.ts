/** @module Controllers/Search */
import { Request, Response } from 'express';
import Fuse from 'fuse.js';
import Post from '../models/post-model.js';
import Answer from '../models/answer-model.js';
import User from '../models/user-model.js';
import Tag from '../models/tag-model.js';
import Group from '../models/group-model.js';

/** Searches for all public posts and groups based on a query provided in the
 * URL query string. */
export const sendSearchResults = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const query = String(req.query.query);

        /** Gather posts and groups to search in. */
        const posts = await Post.findAll({
            where: {
                groupId: null,
            },
            include: [User, Tag, Answer],
        });
        const groups = await Group.findAll({
            where: {
                type: 'public',
            },
            include: [User],
        });

        /** Create Fuse instances and define properties to be considered when
         * searching. */
        const postsFuse = new Fuse(posts, {
            keys: ['title', 'tags.name', 'user.firstName', 'user.lastName'],
            threshold: 0.5,
        });
        const groupsFuse = new Fuse(groups, {
            keys: ['name'],
            threshold: 0.5,
        });

        /** Search and send the results. */
        const results = {
            posts: postsFuse.search(query, {
                limit: 10,
            }),
            groups: groupsFuse.search(query, {
                limit: 10,
            }),
        };
        res.json(results);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

/** Sends the top four tags used by the users. */
export const sendPopularTags = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const tags = await Tag.findAll({
            include: [Post],
        });
        const popularTags = tags
            .sort((a, b) => {
                return b.posts.length - a.posts.length;
            })
            .slice(0, 4);
        res.json(popularTags);
    } catch (error) {
        res.status(400).json(error.message);
    }
};
