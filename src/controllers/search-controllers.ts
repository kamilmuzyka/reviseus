/** @module Controllers/Search */
import { Request, Response } from 'express';
import Fuse from 'fuse.js';
import Post from '../models/post-model.js';
import Answer from '../models/answer-model.js';
import User from '../models/user-model.js';
import Tag from '../models/tag-model.js';

/** Searches for all public posts based on a query provided in the URL query
 * string. Properties taken into consideration by the search algorithm are
 * title, content, tags and author. */
export const sendSearchResults = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const query = String(req.query.query);

        /** Gather data to search in. */
        const posts = await Post.findAll({
            where: {
                groupId: null,
            },
            include: [User, Tag, Answer],
        });

        /** Create Fuse instance and define properties to be considered when
         * searching. */
        const fuse = new Fuse(posts, {
            keys: [
                'title',
                'content',
                'tags.name',
                'user.firstName',
                'user.lastName',
            ],
        });

        /** Search and send the results. */
        const results = fuse.search(query, {
            limit: 10,
        });
        res.json(results);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

/** Sends the top four tags used by users. Includes tag posts. */
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
