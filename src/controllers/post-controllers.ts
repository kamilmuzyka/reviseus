/** @module Controllers/Post */
import { Request, Response } from 'express';
import { validateNewPost } from '../lib/validate.js';
import { parseFiles } from '../config/multer-config.js';
import extractHashtags from '../utils/extract-hashtags.js';
import Post from '../models/post-model.js';
import User from '../models/user-model.js';
import Tag from '../models/tag-model.js';
import File from '../models/file-model.js';

export const createNewPost = async (
    req: Request,
    res: Response
): Promise<void> => {
    parseFiles(req, res, async (filesError) => {
        try {
            if (filesError) {
                throw Error(filesError);
            }
            const files = req.files;
            const { userId } = req.user;
            const { title, content, tags } = validateNewPost(req.body);

            /** Find the current user. */
            const user = await User.findOne({
                where: { id: userId },
                include: [Post],
            });
            if (!user) {
                throw Error(
                    'Could not find a user with the corresponding user ID.'
                );
            }

            /** Create a Post instance and associate it with the current user. */
            const newPost = await Post.create({ title, content });
            await user.$set('posts', [...user.posts, newPost]);

            /** Find or create any attached tags and associate them with the new
             * post. */
            if (tags && tags.length) {
                const hashtags = extractHashtags(tags);
                const postHashtags = await Promise.all(
                    hashtags.map(async (tag) => {
                        const postTag = await Tag.findOrCreate({
                            where: {
                                name: tag,
                            },
                        });
                        return postTag[0];
                    })
                );
                await newPost.$set('tags', postHashtags);
            }

            /** Reflect any uploaded files in the database. */
            if (files && files.length) {
                const postFiles = await Promise.all(
                    files.map(async (file) => {
                        const postFile = await File.create({
                            name: file.originalname,
                            uri: file.path,
                        });
                        return postFile;
                    })
                );
                await newPost.$set('files', postFiles);
            }

            //** To do: <Check for group> */

            /** Find the new (mutated) post and send it to the client. */
            const createdPost = await Post.findOne({
                where: {
                    id: newPost.id,
                },
                include: [User, Tag, File],
            });
            res.json(createdPost);
            return;
        } catch (error) {
            res.status(400).json(error.message);
        }
    });
};
