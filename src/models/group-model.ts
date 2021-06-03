/** @module Model/Group */
import { Optional } from 'sequelize';
import {
    Table,
    Column,
    Model,
    DataType,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';
import User from './user-model.js';
import UserGroups from './user-groups-model.js';
import Post from './post-model.js';

export interface GroupAttributes {
    id: string;
    name: string;
    type: string;
    users?: User[];
    posts?: Post[];
}

interface GroupCreationAttributes extends Optional<GroupAttributes, 'id'> {}

@Table({
    timestamps: false,
})
class Group extends Model<GroupAttributes, GroupCreationAttributes> {
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
    name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type: string;

    @BelongsToMany(() => User, () => UserGroups)
    users: User[];

    @HasMany(() => Post)
    posts: Post[];
}

export default Group;
