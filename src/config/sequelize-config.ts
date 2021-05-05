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

/** User-Group (M:N) */
User.belongsToMany(Group, { through: 'UserGroups', timestamps: false });
Group.belongsToMany(User, { through: 'UserGroups', timestamps: false });

/** User-Post (1:M) */
User.hasMany(Post);
Post.belongsTo(User);

/** User-Answer (1:M) */
User.hasMany(Answer);
Answer.belongsTo(User);

/** Group-Post (1:M) */
Group.hasMany(Post);
Post.belongsTo(Group);

/** Post-Tag (M:N) */
Post.belongsToMany(Tag, { through: 'PostTags', timestamps: false });
Tag.belongsToMany(Post, { through: 'PostTags', timestamps: false });

/** Post-File (1:M) */
Post.hasMany(File);
File.belongsTo(Post);

/** Post-Answer (1:M) */
Post.hasMany(Answer);
Answer.belongsTo(Post);

export default sequelize;
