/** @module Model/User */
import { Optional } from 'sequelize';
import {
    Table,
    Column,
    Model,
    DataType,
    HasMany,
    BelongsToMany,
} from 'sequelize-typescript';
import Post from './post-model.js';
import Answer from './answer-model.js';
import Group from './group-model.js';
import UserGroups from './user-groups-model.js';

export interface UserAttributes {
    id: string;
    firstName: string;
    lastName: string;
    profilePhoto?: string;
    googleId?: string;
    posts?: Post[];
    answers?: Answer[];
    groups?: Group[];
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

@Table({
    timestamps: false,
    defaultScope: {
        attributes: { exclude: ['googleId'] },
    },
})
class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column({
        type: DataType.STRING,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @Column({
        type: DataType.TEXT,
        allowNull: true,
    })
    profilePhoto: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    googleId: string;

    @HasMany(() => Post)
    posts: Post[];

    @HasMany(() => Answer)
    answers: Answer[];

    @BelongsToMany(() => Group, () => UserGroups)
    groups: Group[];
}

export default User;
