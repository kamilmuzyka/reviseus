/** @module Config/Sequelize */
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user-model.js';
import Group from '../models/group-model.js';
import Post from '../models/post-model.js';
import Tag from '../models/tag-model.js';
import File from '../models/file-model.js';
import Answer from '../models/answer-model.js';

dotenv.config();

/** Database Schema: ![Database Schema as Entity Relationship
 * Diagram](media://schema.jpeg) */
const sequelize = new Sequelize(process.env.DB_URI ?? '', {
    logging: false,
});

sequelize.addModels([User, Group, Post, Tag, File, Answer]);

export default sequelize;
