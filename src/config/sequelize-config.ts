/** @module Config/Sequelize */
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

/** Database Schema: ![Database Schema as Entity Relationship
 * Diagram](media://schema.jpeg) */
const sequelize = new Sequelize(process.env.DB_URI ?? '', {
    logging: false,
});

export default sequelize;
