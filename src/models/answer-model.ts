/** @module Model/Answer */
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
import Post, { PostAttributes } from './post-model.js';

export interface AnswerAttributes {
    id: string;
    content: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId?: string;
    postId?: string;
}

interface AnswerCreationAttributes extends Optional<AnswerAttributes, 'id'> {}

@Table
class Answer extends Model<AnswerAttributes, AnswerCreationAttributes> {
    @Column({
        type: DataType.STRING,
        defaultValue: DataType.UUIDV4,
        primaryKey: true,
    })
    id: string;

    @Column({
        type: DataType.STRING(510),
        allowNull: false,
    })
    content: string;

    @ForeignKey(() => User)
    @Column
    userId: string;

    @ForeignKey(() => Post)
    @Column
    postId: string;

    @BelongsTo(() => User)
    user: UserAttributes;

    @BelongsTo(() => Post)
    post: PostAttributes;
}

export default Answer;
