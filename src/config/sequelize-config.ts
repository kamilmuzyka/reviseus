/** @module Config/Sequelize */
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user-model.js';
import Group from '../models/group-model.js';
import UserGroups from '../models/user-groups-model.js';
import Post from '../models/post-model.js';
import Tag from '../models/tag-model.js';
import PostTags from '../models/post-tags-model.js';
import File from '../models/file-model.js';
import Answer from '../models/answer-model.js';

dotenv.config();

/** Database Schema: ![Database Schema as Entity Relationship
 * Diagram](media://schema.jpeg) */
const sequelize = new Sequelize(process.env.DB_URI ?? '', {
    models: [User, Group, UserGroups, Post, Tag, PostTags, File, Answer],
    logging: false,
});

export default sequelize;
