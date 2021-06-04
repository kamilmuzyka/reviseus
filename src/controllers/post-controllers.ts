/** @module Controllers/Post */
import { Request, Response } from 'express';
import { validateNewPost, validatePostAnswer } from '../lib/validate.js';
import { parseFiles } from '../config/multer-config.js';
import extractHashtags from '../utils/extract-hashtags.js';
import testUUID from '../utils/test-uuid.js';
import Post from '../models/post-model.js';
import User from '../models/user-model.js';
import Tag from '../models/tag-model.js';
import File from '../models/file-model.js';
import Answer from '../models/answer-model.js';
import Group from '../models/group-model.js';

/** Creates a new post based on data attached to a request body. Use on
 * protected routes only. */
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
            const groupId = req.params.id;
            const { userId } = req.user;
            const { title, content, tags } = validateNewPost(req.body);

            if (!(groupId && testUUID(groupId)) && groupId !== 'public') {
                throw Error('Incorrect post ID.');
            }

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
                            mimetype: file.mimetype,
                        });
                        return postFile;
                    })
                );
                await newPost.$set('files', postFiles);
            }

            if (testUUID(groupId)) {
                const group = await Group.findOne({
                    where: {
                        id: groupId,
                    },
                    include: [Post],
                });
                if (!group?.$has('users', user)) {
                    throw Error('You need to be a group member to add posts.');
                }
                await group?.$set('posts', [...group.posts, newPost]);
            }

            /** Find the new (mutated) post and send it to the client. */
            const createdPost = await Post.findOne({
                where: {
                    id: newPost.id,
                },
                include: [User, Tag, File, Answer],
            });
            res.json(createdPost);
            return;
        } catch (error) {
            res.status(400).json(error.message);
        }
    });
};

/** Creates a post answer based on data attached to a request body and
associates it with a post specified by ID. Use on protected routes only. */
export const createPostAnswer = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { userId } = req.user;
        const { postId, content } = validatePostAnswer(req.body);

        /** Find the current user. */
        const user = await User.findOne({
            where: { id: userId },
            include: [Answer],
        });
        if (!user) {
            throw Error(
                'Could not find a user with the corresponding user ID.'
            );
        }

        /** Find the indicated post. */
        const post = await Post.findOne({
            where: { id: postId },
            include: [Answer],
        });
        if (!post) {
            throw Error(
                'Could not find a post with the corresponding post ID.'
            );
        }

        /** Create an Answer instance and associate it with the current user and
         * the indicated post. */
        const postAnswer = await Answer.create({ content });
        await user.$set('answers', [...user.answers, postAnswer]);
        await post.$set('answers', [...post.answers, postAnswer]);

        //** To do: <Check for group> */

        /** Find the new (mutated) answer and send it to the client. */
        const createdAnswer = await Answer.findOne({
            where: {
                id: postAnswer.id,
            },
            include: [User],
        });
        res.json(createdAnswer);
        return;
    } catch (error) {
        res.status(400).json(error.message);
    }
};

/** Sends data of any post based on post ID passed as a URL parameter. */
export const sendSinglePost = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const postId = req.params.id;
        if (postId && testUUID(postId)) {
            const post = await Post.findOne({
                where: {
                    id: postId,
                },
                include: [User, Tag, File, Answer],
            });
            if (!post) {
                throw Error(
                    'Could not find a post with the corresponding post ID.'
                );
            }
            res.json(post);
            return;
        }
        throw Error('Invalid post ID.');
    } catch (error) {
        res.status(400).json(error.message);
    }
};

/** Sends public posts that don't belong to any group. Anyone should be able to
 * access public posts. */
export const sendPublicPosts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const offset = req.query.offset ?? 0;
        const publicPosts = await Post.findAll({
            where: {
                groupId: null,
            },
            order: [['createdAt', 'DESC']],
            limit: 10,
            offset: Number(offset),
            include: [User, Answer],
        });
        res.json(publicPosts);
        return;
    } catch (error) {
        res.status(400).json(error.message);
    }
};

/** Sends all answers of any post based on post ID passed as a URL parameter. */
export const sendPostAnswers = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const postId = req.params.id;
        if (postId && testUUID(postId)) {
            const answers = await Answer.findAll({
                where: {
                    postId,
                },
                order: [['createdAt', 'ASC']],
                include: [User],
            });
            if (!answers) {
                throw Error('Could not find answers for the provided post ID.');
            }
            res.json(answers);
            return;
        }
    } catch (error) {
        res.status(400).json(error.message);
    }
};
