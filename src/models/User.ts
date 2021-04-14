/** @module Model/User */
import Sequelize from 'sequelize';
import sequelize from '../config/sequelize-config.js';

const { DataTypes } = Sequelize;

/** User model schema. */
const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profilePhoto: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        googleId: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    { timestamps: false }
);

export default User;
