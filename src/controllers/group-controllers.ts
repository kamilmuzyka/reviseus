/** @module Controllers/Group */
import { Request, Response } from 'express';
import { validateNewGroup } from '../lib/validate.js';
import testUUID from '../utils/test-uuid.js';
import Post from '../models/post-model.js';
import User from '../models/user-model.js';
import Answer from '../models/answer-model.js';
import Group from '../models/group-model.js';

/** Creates either public or a private group for the current user. Use on
 * protected routes only. */
export const createNewGroup = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { name, type } = validateNewGroup(req.body);
        const { userId } = req.user;

        /** Prevent creating groups with the same name. */
        const existingGroup = await Group.findOne({
            where: {
                name,
            },
        });
        if (existingGroup) {
            throw Error(
                'This group name has already been taken. Please choose a different name.'
            );
        }

        /** Find the current user. */
        const user = await User.findOne({
            where: { id: userId },
            include: [Group],
        });
        if (!user) {
            throw Error(
                'Could not find a user with the corresponding user ID.'
            );
        }

        /** Create a Group instance and associate it with the current user. */
        const group = await Group.create({ name, type });
        await user.$set('groups', [...user.groups, group]);

        /** Send the new group to the client. */
        res.json(group);
        return;
    } catch (error) {
        res.status(400).json(error.message);
    }
};

/** Associates the current user with a group specified by the group ID attached
to a request body. Use on protected routes only. */
export const joinGroup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { groupId } = req.body;
        const { userId } = req.user;

        /** Check if the group ID has been provided. */
        if (!groupId || !testUUID(groupId)) {
            throw Error('Incorrect or missing group ID.');
        }

        /** Find the group that the user wants to join. */
        const group = await Group.findOne({
            where: { id: groupId },
            include: [User],
        });
        if (!group) {
            throw Error(
                'Could not find a group with the corresponding group ID.'
            );
        }

        /** Find the current user. */
        const user = await User.findOne({
            where: { id: userId },
            include: [Group],
        });
        if (!user) {
            throw Error(
                'Could not find a user with the corresponding user ID.'
            );
        }

        /** Associate user with the group. */
        await user.$set('groups', [...user.groups, group]);
        await group.$set('users', [...group.users, user]);

        /** Send the group that the user has joined to the client. */
        res.json(group);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

/** Breaks the association between the current user and a group specified by the
group ID attached to a request body. Use on protected routes only. */
export const leaveGroup = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { groupId } = req.body;
        const { userId } = req.user;

        /** Check if the group ID has been provided. */
        if (!groupId || !testUUID(groupId)) {
            throw Error('Incorrect or missing group ID.');
        }

        /** Find the group that the user wants to leave. */
        const group = await Group.findOne({
            where: { id: groupId },
            include: [User],
        });
        if (!group) {
            throw Error(
                'Could not find a group with the corresponding group ID.'
            );
        }

        /** Find the current user. */
        const user = await User.findOne({
            where: { id: userId },
            include: [Group],
        });
        if (!user) {
            throw Error(
                'Could not find a user with the corresponding user ID.'
            );
        }

        /** Break the association between the user and the group. */
        await user.$remove('groups', group);
        await group.$remove('user', user);

        /** Send the group that the user has left to the client. */
        res.json(group);
    } catch (error) {
        res.status(400).json(error.message);
    }
};

/** Sends posts belonging to a group specified by ID passed as a URL parameter.
 * The current user must be a member of the group to access its posts. Use on
 * protected routes only. */
export const sendGroupPosts = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const groupId = req.params.id;
        const { userId } = req.user;
        const offset = req.query.offset ?? 0;

        /** Check if the group ID has been provided. */
        if (!groupId || !testUUID(groupId)) {
            throw Error('Incorrect group ID.');
        }

        /** Find the specified group. */
        const group = await Group.findOne({
            where: {
                id: groupId,
            },
            include: [User],
        });
        if (!group) {
            throw Error(
                'Could not find a group with the corresponding group ID.'
            );
        }

        /** Find the current user. */
        const user = await User.findOne({
            where: {
                id: userId,
            },
        });
        if (!user) {
            throw Error(
                'Could not find a user with the corresponding user ID.'
            );
        }

        /** Check if the current user is a member of the group. */
        const isMember = await group.$has('users', user);
        if (!isMember) {
            throw Error(
                'You must be a member of this group to access its posts.'
            );
        }

        /** Find and send group posts. */
        const groupPosts = await Post.findAll({
            where: {
                groupId,
            },
            order: [['createdAt', 'DESC']],
            limit: 10,
            offset: Number(offset),
            include: [User, Answer],
        });
        res.json(groupPosts);
        return;
    } catch (error) {
        res.status(400).json(error.message);
    }
};

/** Sends global posts that don't belong to any group. Anyone can access these
 * posts. */
export const sendGlobalPosts = async (
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
