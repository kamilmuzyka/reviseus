/** @module Config/Database */
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

/** Database Schema ![Database Schema as Entity Relationship
 * Diagram](media://schema.jpeg) */
const db = new Pool({
    connectionString: process.env.DB_URI,
});

export default db;
