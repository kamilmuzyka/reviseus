/** @module Model/Post */
import { Optional } from 'sequelize';
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import User, { UserAttributes } from './user-model.js';

export interface PostAttributes {
    id: string;
    title: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
    user?: UserAttributes;
}

interface PostCreationAttributes extends Optional<PostAttributes, 'id'> {}

@Table
class Post extends Model<PostAttributes, PostCreationAttributes> {
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
    title: string;

    @Column({
        type: DataType.STRING(510),
        allowNull: false,
    })
    content: string;

    @ForeignKey(() => User)
    @Column
    userId: string;

    @BelongsTo(() => User)
    user: UserAttributes;
}

export default Post;
