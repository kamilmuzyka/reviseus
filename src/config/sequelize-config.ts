/** @module Config/Sequelize */
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/user-model.js';

dotenv.config();

/** Database Schema: ![Database Schema as Entity Relationship
 * Diagram](media://schema.jpeg) */
const sequelize = new Sequelize(process.env.DB_URI ?? '', {
    logging: false,
});

sequelize.addModels([User]);

export default sequelize;
